import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import * as service from '../services/userService';
import response from '../middleware/response';
import * as env from '../config';

const { environment } = env;
const { jwtSecret } = environment;

export async function authentificateUser(req: Request, res: Response) {
    const { body } = req;
    const validationUser: boolean = await checkUser(body);
    if(validationUser) {
        const token = jwt.sign({ username: req.body.username }, jwtSecret)
        response(res, 200, { token })
    } else {
        response(res, 401, { message: 'User not found' });
    }
}

async function checkUser(body: any): Promise<boolean> {
    try {
        return await service.findUser(body);
    } catch (error) {
        console.error(error);
        return false;
    }
}