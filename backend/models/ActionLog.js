import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  action: String,
  taskId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('ActionLog', logSchema);