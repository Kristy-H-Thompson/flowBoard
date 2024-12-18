import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY || 'your-secret-key', (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        const decodedPayload = decoded;
        req.user = decodedPayload;
        next();
    });
};
