import { Router } from 'express';

import { getUser, getUsers, createUser, uploadImage } from './../controllers/user.controller';
import multer from '../lib/uploadImageProfile';

const router = Router();
// user
router.get('/:id', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.post('/uploadImage/:userId', multer.single('image'), uploadImage)



export default router;