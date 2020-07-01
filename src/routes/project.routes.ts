import { Router } from 'express';
import { createProject, getProjects, getProject, updateProject, addContent, updateContent, getImageContent, deleteContent } from '../controllers/project.controller';
import multer from '../lib/addContentProject';

const router = Router();
// project

router.get('/:id', getProject);
router.get('/', getProjects);
router.post('/', createProject);
router.patch('/:id', updateProject);

// contentDigital
router.post('/addcontent/:idProject', multer.single('content'), addContent);
router.patch('/updateContent/:idProject/:idContent', multer.single('content'), updateContent);
router.get('/getImage/:idContent', getImageContent);

router.delete('/contentdigital/:id', deleteContent);

export default router;