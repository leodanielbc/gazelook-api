import { Router } from 'express';

import { getUser, getUsers, createUser, uploadImage, getImageProfile, updateUser } from './../controllers/user.controller';
import multer from '../lib/uploadImageProfile';

const router = Router();
// user
router.get('/:id', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.post('/uploadImage/:userId', multer.single('image'), uploadImage);
router.get('/getImage/:id', getImageProfile);
router.patch('/:id', updateUser);



export default router;