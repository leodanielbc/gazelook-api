import { Router } from 'express';

import { getCategories, getCategory, createCategory, updateCategory, deleteCategory} from './../controllers/category.controller';

const router = Router();

// category
router.get('/:id', getCategory);
router.get('/', getCategories);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);


export default router;