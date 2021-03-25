import { ILog } from '../models/log';
import logService from '../services/logService';

export default async function addLog(log: ILog): Promise<void> {

    try {       
        const result: ILog = await logService(log);
        if(!result) {
            console.error(`Record to log didn't create`);
        }
    } catch (error) {
        console.error(`Record to log didn't create with error ${error}`);
    }
}