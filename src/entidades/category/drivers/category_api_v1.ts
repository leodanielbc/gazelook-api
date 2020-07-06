import express from 'express'
import categoryController from '../adapter/index'
import makeCallBack from '../../../drivers/express-callback/index'

import Logger from '../../../drivers/logging/logger'
import config from 'config'

const logger = Logger({ config })

const router = express.Router()

router.post('/', makeCallBack(categoryController.createCategory, logger));
router.get('/', makeCallBack(categoryController.getCategories, logger));
router.get('/:id', makeCallBack(categoryController.getCategory, logger));
router.patch('/:id', makeCallBack(categoryController.updateCategory, logger));
router.delete('/:id', makeCallBack(categoryController.deleteCategory, logger));

export default router;


