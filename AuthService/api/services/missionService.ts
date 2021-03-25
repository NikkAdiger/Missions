import axios from 'axios';
import aes from '../middleware/aesEncryption';
import * as env from '../config';
import { IMission } from "../models/interfaces";

const { environment } = env;
const missionUrl = `${environment.missionServer.protocol}://${environment.missionServer.host}:${environment.missionServer.port}/`;
const { missionRoute } = environment;

export async function getMissions(): Promise<IMission[]> {
    let res: IMission[] = [];
    const encResult: any = await axios.get(`${missionUrl}${missionRoute}`); 
    const { data } = aes.decrypt(encResult.data);
    if(data) res = data;
    return res;
}

export async function getMission(id: string): Promise<IMission> {
    let res: IMission;
    const encResult: any = await axios.get(`${missionUrl}${missionRoute}/${id}`); 
    const { data } = aes.decrypt(encResult.data);
    if(data) res = data;
    return res;
}

export async function createMission(mission: IMission): Promise<IMission> {
    let res: IMission;
    const encBody = aes.encrypt(mission);
    const url = `${missionUrl}${missionRoute}`;

    const encResult: any = await axios.post(url, { encBody });
    const { data } = aes.decrypt(encResult.data);
    if(data) res = data;
    return res;
}

export async function updateMission(id: string, mission: IMission): Promise<IMission> {
    let res: IMission;
    const encBody = aes.encrypt(mission);
    const encResult: any = await axios.put(`${missionUrl}${missionRoute}/${id}`, { encBody }); 
    const { data } = aes.decrypt(encResult.data);
    if(data) res = data;
    return res;
}

export async function removeMission(id: string): Promise<IMission> {
    let res: IMission;
    const encResult: any = await axios.delete(`${missionUrl}${missionRoute}/${id}`); 
    const { data } = aes.decrypt(encResult.data);
    if(data) res = data;
    return res;
}