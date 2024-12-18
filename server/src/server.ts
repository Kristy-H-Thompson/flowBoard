import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';  // Import cors
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your frontend URL
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests only from your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
}));

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});