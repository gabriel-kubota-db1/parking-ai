import { Router } from 'express';
import { getAllSpots } from './controller.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';

const router = Router();

router.get('/', isAuthenticated, getAllSpots);

export default router;
