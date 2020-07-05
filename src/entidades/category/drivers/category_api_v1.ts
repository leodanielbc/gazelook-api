import express from 'express'
import categoryController from '../adapter/index'
import makeCallBack from '../../../drivers/express-callback/index'

import Logger from '../../../drivers/logging/logger'
import config from 'config'

const logger = Logger({ config })

const router = express.Router()

router.post('/', makeCallBack(categoryController.createCategory, logger))
router.get('/', makeCallBack(categoryController.getCategories, logger))

export default router


