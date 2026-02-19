import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    colorTheme: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Branch', branchSchema);
