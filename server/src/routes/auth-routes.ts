import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import asyncHandler from 'express-async-handler';

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your-secret-key';

// POST /login - Login a user
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;
    console.log('Received credentials:', { username, password });

    if (!username || !password) {
      console.error("Username or password is missing");
      res.status(400).json({ message: 'Username and password are required' });
      return; // Return early if credentials are missing
    }

    // Step 1: Check if the user exists
    const user = await User.findOne({ where: { username } });
    console.log('User lookup result:', user); // Log the result of the user lookup

    if (!user) {
      console.error("User not found");
      res.status(404).json({ message: 'User not found' });
      return; // Ensure we return here to prevent further execution
    }

    // Step 2: Verify the password
    console.log('Verifying password...');
    const isPasswordValid = await user.validatePassword(password); // Use the validatePassword method
    console.log('Password verification result:', isPasswordValid); // Log the result

    if (!isPasswordValid) {
      console.error("Invalid password");
      res.status(401).json({ message: 'Invalid password' });
      return; // Prevent further execution if password is invalid
    }

    // Step 3: Generate JWT token
    console.log('Password verified, generating token...');
    const payload = {
      username: user.username,
      userId: user.id, // Include userId in the token
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT token generated:', token); // Log the generated token

    // Step 4: Send the token as a response
    res.json({ message: 'Login successful', token });
    console.log('Login successful, response sent');
  }
);

// Initialize router and bind login route
const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;