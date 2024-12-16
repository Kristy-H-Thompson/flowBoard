import express from 'express';
import dotenv from 'dotenv';
import router from './server/src/routes/auth-routes'; // Correct import

dotenv.config();

// Create an instance of Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up routes
app.use('/api/auth', router); // This should work if authRoutes is an express.Router() export

//a simple health check route
app.get('/', (_, res) => {  
    res.send('Hello, World!');
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});