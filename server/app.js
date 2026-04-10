import express from 'express';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', authRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send('Api is running');
});

export default app;