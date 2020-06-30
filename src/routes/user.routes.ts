import { Router } from 'express';

import { getUser, getUsers, createUser } from './../controllers/user.controller';

const router = Router();
// user
router.get('/:id', getUser);
router.get('/', getUsers);
router.post('/', createUser);



export default router;