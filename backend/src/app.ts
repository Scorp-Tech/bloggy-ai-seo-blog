import express from 'express';
import cors from 'cors';
import { apiRouter } from './api';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

export default app;