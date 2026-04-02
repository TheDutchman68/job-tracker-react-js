import express from 'express';
import Job from '../models/Job.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



router.post('/', async (req, res) => {
  try {
    const job = await Job.create({...req.body, createdBy: req.user.userId});
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});



router.get('/:id', async (req,res) => {
  try {
    const { id: jobId} = req.params;

    const job = await Job.findOne({ _id: jobId, createdBy: req.user.userId });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
})


router.patch('/:id', async (req,res) => {
  try {
    const { id: jobId } = req.params;

    const job = await Job.findOne({ _id: jobId, createdBy: req.user.userId});
    if (!job) return res.status(404).json({success: false, message: 'Job not found'});

    Object.assign(job, req.body);
    await job.save();

    res.status(200).json({success: true, data: job});
  } catch(error){
    res.status(400).json({success: false, message: error.message});
  }
});

router.delete('/:id', async (req,res) => {
  try {
    const { id: jobId } = req.params;

    const job = await Job.findOneAndDelete({ _id: jobId, createdBy: req.user.userId});
    if (!job) return res.status(404).json({success: false, message: 'Job not found'});

    res.status(200).json({ success: true, message: 'Job deleted' });
  }catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
})

router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query;

    let queryObject = { createdBy: req.user.userId };

    if (search) queryObject.position = { $regex: search, $options: 'i' };
    if (status) queryObject.status = status;

    const jobs = await Job.find(queryObject);

    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
