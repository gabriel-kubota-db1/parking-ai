import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { setupDatabase } from './config/database.js';
import authRoutes from './domains/auth/routes.js';
import parkingSpotRoutes from './domains/parking-spots/routes.js';
import parkingSessionRoutes from './domains/parking-sessions/routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

setupDatabase();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Parking Lot Management API is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/parking-spots', parkingSpotRoutes);
app.use('/api/parking-sessions', parkingSessionRoutes);

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
