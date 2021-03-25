import express from 'express';
import * as missionController from '../controllers/missionController';

const router = express.Router();

router.get('/', missionController.getMissions);
router.get('/:id', missionController.getMission);
router.post('/', missionController.createMission);
router.put('/:id', missionController.updateMission);
router.delete('/:id', missionController.removeMission);

export default router;