import { Router } from 'express';
import { parkVehicle, unparkVehicle } from './controller.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';

const router = Router();

router.post('/park', isAuthenticated, parkVehicle);
router.post('/unpark', isAuthenticated, unparkVehicle);

export default router;
