import express from 'express';
import dotenv from 'dotenv';
import router from './server/src/routes/auth-routes'; // Correct import
import { sequelize } from './server/src/models'; // Adjust the path to where your sequelize instance is defined

dotenv.config();

// Create an instance of Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up routes
app.use('/api/auth', router); // This should work if authRoutes is an express.Router() export

// A simple health check route
app.get('/', (_, res) => {  
  res.send('Hello, World!');
});

// Synchronize the Sequelize models with the database
async function startServer() {
  try {
    console.log('Synchronizing database...');
    await sequelize.sync({ force: false });  // You can set `force: true` for resetting tables, but use with caution!
    console.log('Database synchronized successfully.');

    // Start the server after the database syncs
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
}

startServer();
