import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema(
  {
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    topics: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Unit', unitSchema);
