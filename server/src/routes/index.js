import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js'; // Assuming your API routes are in a directory called 'api'
import { authenticateToken } from '../middleware/auth.js'; // Authentication middleware
const router = Router();
// Public routes (no authentication required)
router.use('/auth', authRoutes);
// Protected routes (authentication required)
router.use('/api', authenticateToken, apiRoutes);
export default router;
