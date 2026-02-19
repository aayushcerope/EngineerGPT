import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import academicRoutes from './routes/academicRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/academics', academicRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notes', noteRoutes);

export default app;
