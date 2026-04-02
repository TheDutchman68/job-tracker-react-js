import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  
const app = express();

app.get('/', (req, res) => {
  res.send('Api is running');
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



app.use(express.json());
app.use(cors());
app.use('/api/users', authRoutes);
app.use('/api/jobs', jobRoutes);