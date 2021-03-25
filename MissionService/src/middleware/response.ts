import { Response } from 'express';
import aes from '../middleware/aesEncryption';
import addLog from '../controllers/auditController'
import { Log } from '../models/log';

export default function response(res: Response, status: number, data: any, error?: Error): void {
    const request = {
        status,
        data
    }
    if(error) request['error'] = error;

    const { method } = res.req;
    if(method === 'POST' || method === 'PUT' || method === 'DELETE') {
        addLog(new Log({
            status,
            method,
            route: `${res.req.baseUrl}${res.req.url}`,
            data,
            error: error ? error.message : ''            
        }))
    }
    const aesRequest = aes.encrypt(request);
    res.status(status).send(aesRequest);
    return;
}