import express from 'express';
import * as controller from '../controllers/userController';

const router = express.Router();

router.post('/login', controller.authentificateUser);

export default router;