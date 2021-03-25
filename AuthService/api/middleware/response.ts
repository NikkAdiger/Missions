import { Response } from 'express';

export default function response(res: Response, status: number, data: any, error?: Error): void {
    const request = {
        status,
        data
    }
    if(error) request['error'] = error;

    res.status(status).send(request);
    return;
}