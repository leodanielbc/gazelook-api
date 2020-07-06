import express from 'express'
import userController from '../adapter/index'
import makeCallBack from '../../../drivers/express-callback/index'

import Logger from '../../../drivers/logging/logger'
import config from 'config'

const logger = Logger({ config })

const router = express.Router()

router.post('/', makeCallBack(userController.createUser, logger));

export default router;


