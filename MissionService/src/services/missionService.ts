import { IMission, Mission } from '../models/mission';

export async function getMissions(): Promise<any> {
    const result = await Mission.find({});
    return result;
}

export async function getMission(id: string): Promise<any> {
    const result = await Mission.findById(id);
    return result;
}

export async function createMission(mission: IMission): Promise<IMission> {
    const newMission: IMission = new Mission(mission);
    const result: IMission = await newMission.save();
    return result;
}

export async function updateMission(id: string, mission: IMission): Promise<IMission> {
    const result: IMission = await Mission.findByIdAndUpdate(id, mission);
    return result;
}

export async function removeMission(id: string): Promise<IMission> {
    const result: IMission = await Mission.findByIdAndDelete(id);
    return result;
}