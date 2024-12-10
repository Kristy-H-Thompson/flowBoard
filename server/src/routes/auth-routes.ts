import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';

// Define a JWT secret key (it can be stored in .env file)
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your-secret-key';

// POST /login - Login a user
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  try {
    // Step 1: Check if the user exists
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Step 3: Generate JWT token
    const payload = {
      username: user.username,
      userId: user.id, // You can include any other data you need in the JWT payload
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Step 4: Send the token as a response
    return res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Initialize router and bind login route
const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;