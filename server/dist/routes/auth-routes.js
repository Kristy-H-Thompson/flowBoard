import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import asyncHandler from 'express-async-handler';
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your-secret-key';
export const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    console.log('Received credentials:', { username, password });
    if (!username || !password) {
        console.error("Username or password is missing");
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }
    const user = await User.findOne({ where: { username } });
    console.log('User lookup result:', user);
    if (!user) {
        console.error("User not found");
        res.status(404).json({ message: 'User not found' });
        return;
    }
    console.log('Verifying password...');
    const isPasswordValid = await user.validatePassword(password);
    console.log('Password verification result:', isPasswordValid);
    if (!isPasswordValid) {
        console.error("Invalid password");
        res.status(401).json({ message: 'Invalid password' });
        return;
    }
    console.log('Password verified, generating token...');
    const payload = {
        username: user.username,
        userId: user.id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT token generated:', token);
    res.json({ message: 'Login successful', token });
    console.log('Login successful, response sent');
});
const router = Router();
router.post('/login', login);
export default router;
