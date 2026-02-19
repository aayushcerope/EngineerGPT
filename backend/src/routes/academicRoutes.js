import { Router } from 'express';
import {
  listBranches,
  listSubjects,
  listUnits,
  upsertBranch,
  upsertSubject,
  upsertUnit,
} from '../controllers/academicController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/branches', requireAuth, listBranches);
router.get('/branches/:branchCode/subjects', requireAuth, listSubjects);
router.get('/subjects/:subjectId/units', requireAuth, listUnits);

router.put('/admin/branches/:code', requireAuth, requireRole('admin'), upsertBranch);
router.put('/admin/subjects/:subjectId', requireAuth, requireRole('admin'), upsertSubject);
router.put('/admin/units/:unitId', requireAuth, requireRole('admin'), upsertUnit);

export default router;
