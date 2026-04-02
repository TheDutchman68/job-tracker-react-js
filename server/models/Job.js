import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide job company'],
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
  },
  status: {
    type: String,
    enum: ['applied', 'interview', 'rejected'],
    default: 'applied',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);