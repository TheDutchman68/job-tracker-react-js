import express from 'express';
import Job from '../models/Job.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



router.post('/', async (req, res) => {
  try {
    const job = await Job.create({...req.body, createdBy: '69cd72bc1a672512600e412e'});
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
