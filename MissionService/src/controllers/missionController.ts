import { Request, Response } from 'express';
import response from '../middleware/response';
import aes from '../middleware/aesEncryption';
import * as missionService from '../services/missionService';
import { IMission } from '../models/mission';

export async function getMissions(req: Request, res: Response): Promise<void> {
    try {    
        const result: IMission[] = await missionService.getMissions();
        if(!result) {
            response(res, 404, `Missions doesn't exist in DB`);
            return;
        }
        response(res, 200, result);
    } catch (error) {
        console.error(`GETMissions failed: ${error}`);
        response(res, 404, 'GETMissions failed', error.message);
    }
}

export async function getMission(req: Request, res: Response): Promise<void> {
    
    const { params } = req;
    try {       
        const result: IMission = await missionService.getMission(params.id);
        if(!result) {
            response(res, 404, `Mission with id: ${params.id} not found`);
            return;
        }
        response(res, 200, result);
    } catch (error) {
        console.log(`getMission failed: ${error}`);
        response(res, 404, 'getMission failed', error.message);
    }
}

export async function createMission(req: Request, res: Response): Promise<void> {

    const { body } = req;
    try {       
        const mission: IMission = aes.decrypt(body.encBody);
        const result: IMission = await missionService.createMission(mission);
        if(!result) {
            response(res, 404, `Mission didn't create`);
            return;
        }
        response(res, 200, result);
    } catch (error) {
        console.log(`createMission failed: ${error}`);
        response(res, 404, 'createMission failed', error.message);
    }
}

export async function updateMission(req: Request, res: Response): Promise<void> {

    const { id } = req.params;
    const { body } = req;
    try {       
        const mission: IMission = aes.decrypt(body.encBody);
        const result: IMission = await missionService.updateMission(id, mission);
        if(!result) {
            response(res, 404, `Mission didn't update`);
            return;
        }
        response(res, 200, result);
    } catch (error) {
        console.log(`updateMissionupdateMission failed failed: ${error}`);
        response(res, 404, '', error.message);
    }
}

export async function removeMission(req: Request, res: Response): Promise<void> {

    const { id } = req.params;
    try {       
        const result: IMission = await missionService.removeMission(id);
        if(!result) {
            response(res, 404, `Mission didn't remove`);
            return;
        }
        response(res, 200, result);
    } catch (error) {
        console.log(`updateMission failed: ${error}`);
        response(res, 404, 'updateMission failed', error.message);
    }
}