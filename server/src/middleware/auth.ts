import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;  // Define the user information in the JWT payload
}

export const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  // Step 1: Extract token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Step 2: If no token is provided, send an error response
  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return; // Ensures no further code runs after response is sent
  }

  // Step 3: Verify and decode the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY || 'your-secret-key', (err, decoded) => {
    if (err) {
      // If token is invalid or expired, send an error response
      res.status(403).json({ message: 'Invalid token' });
      return; // Ensures no further code runs after response is sent
    }

    // Step 4: If the token is valid, attach the decoded data (user) to the request object
    const decodedPayload = decoded as JwtPayload;  // Type assertion for decoded token
    req.user = decodedPayload;  // Add the user data to req object

    // Step 5: Proceed to the next middleware or route handler
    next(); // Pass control to the next middleware/handler
  });
};