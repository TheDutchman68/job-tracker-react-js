import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'


dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const testUser = async () => {
  try {
    const user = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: '123456',
    });
    console.log('✅ User created:', user);
  } catch(error){
    console.log('❌ Error creating user:', error.message)
  }
}


testUser();

  
const app = express();

app.get('/', (req, res) => {
  res.send('Api is running');
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});