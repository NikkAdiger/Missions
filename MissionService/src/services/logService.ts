import { ILog, Log } from "../models/log";

export default async function addLog(log: ILog): Promise<ILog> {
    const newRecord: ILog = new Log(log);
    const result: ILog = await newRecord.save();
    return result;
}