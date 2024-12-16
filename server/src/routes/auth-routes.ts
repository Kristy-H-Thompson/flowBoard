import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import asyncHandler from 'express-async-handler';

// Define a JWT secret key (it can be stored in .env file)
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your-secret-key';

// POST /login - Login a user
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;

    // Step 1: Check if the user exists
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Ensure we return here to prevent further execution
    }

    // Step 2: Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return; // Prevent further execution if password is invalid
    }

    // Step 3: Generate JWT token
    const payload = {
      username: user.username,
      userId: user.id, // You can include other user data here if needed
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Step 4: Send the token as a response
    res.json({ message: 'Login successful', token });
  }
);

// Initialize router and bind login route
const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;