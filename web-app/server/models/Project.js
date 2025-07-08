import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String, required: true },
  description: String,
  blueprint: { type: String, required: true },
  region: { type: String, required: true },
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'completed', 'failed'],
    default: 'uploaded'
  },
  aiResults: {
    dimensions: Object,
    materials: Array,
    costEstimate: Number
  }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);