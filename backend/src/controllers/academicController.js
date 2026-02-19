import Branch from '../models/Branch.js';
import Subject from '../models/Subject.js';
import Unit from '../models/Unit.js';

export const listBranches = async (_req, res) => {
  const branches = await Branch.find().sort({ code: 1 });
  res.json(branches);
};

export const listSubjects = async (req, res) => {
  const { branchCode } = req.params;
  const subjects = await Subject.find({ branchCode }).sort({ semester: 1, name: 1 });
  res.json(subjects);
};

export const listUnits = async (req, res) => {
  const { subjectId } = req.params;
  const units = await Unit.find({ subjectId });
  res.json(units);
};

export const upsertBranch = async (req, res) => {
  const { code } = req.params;
  const branch = await Branch.findOneAndUpdate({ code }, req.body, { upsert: true, new: true });
  res.json(branch);
};

export const upsertSubject = async (req, res) => {
  const { subjectId } = req.params;
  const subject = await Subject.findByIdAndUpdate(subjectId, req.body, { upsert: true, new: true });
  res.json(subject);
};

export const upsertUnit = async (req, res) => {
  const { unitId } = req.params;
  const unit = await Unit.findByIdAndUpdate(unitId, req.body, { upsert: true, new: true });
  res.json(unit);
};
