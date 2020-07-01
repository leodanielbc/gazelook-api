import { Router } from 'express';
import { createProject, getProjects, getProject, updateProject, addContent } from '../controllers/project.controller';
import multer from '../lib/addContentProject';

const router = Router();
// project

router.get('/:id', getProject);
router.get('/', getProjects);
router.post('/', createProject);
router.patch('/:id', updateProject);

router.post('/addcontent/:userId', multer.single('content'), addContent);

export default router;