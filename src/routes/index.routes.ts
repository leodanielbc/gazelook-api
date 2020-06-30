import { Router } from 'express';

import user from './user.routes'
import category from './category.routes'

const router = Router();

router.use('/user', user);
router.use('/category', category);

export default router;