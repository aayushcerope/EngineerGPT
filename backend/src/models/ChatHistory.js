import mongoose from 'mongoose';

const chatHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    branchCode: { type: String, required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    intent: { type: String, enum: ['explanation', 'numerical', 'viva', 'revision'], required: true },
    depth: { type: String, enum: ['simple', 'intermediate', 'advanced'], default: 'intermediate' },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    messageType: { type: String, enum: ['concept', 'numerical', 'exam_answer'], default: 'concept' },
  },
  { timestamps: true }
);

export default mongoose.model('ChatHistory', chatHistorySchema);
