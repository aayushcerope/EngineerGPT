import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
    title: { type: String, required: true },
    markdown: { type: String, required: true },
    pinned: { type: Boolean, default: false },
    offlineId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Note', noteSchema);
