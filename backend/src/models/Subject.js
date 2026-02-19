import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    branchCode: { type: String, required: true, index: true },
    name: { type: String, required: true },
    semester: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Subject', subjectSchema);
