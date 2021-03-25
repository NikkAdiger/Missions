import express from 'express';
import * as missionController from '../controllers/missionController';
import * as auth from '../controllers/authController';

const router = express.Router();

router.get('/', auth.authentificateJWT, missionController.getMissions);
router.get('/:id', auth.authentificateJWT, missionController.getMission);
router.post('/', auth.authentificateJWT, missionController.createMission);
router.put('/:id', auth.authentificateJWT, missionController.updateMission);
router.delete('/:id', auth.authentificateJWT, missionController.removeMission);

export default router;