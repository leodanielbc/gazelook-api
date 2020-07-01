import { Router } from 'express';

import user from './user.routes'
import category from './category.routes'
import project from './project.routes'

const router = Router();

router.use('/user', user);
router.use('/category', category);
router.use('/project', project);

export default router;