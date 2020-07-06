import { buildMakeUser, buildIdUser } from './userEntity'
import Schemas from '../../../drivers/hapi_joi/schemas/index'
import ValidatorSchema from '../../../drivers/hapi_joi/validator/validator'

export const makeUser = buildMakeUser(Schemas.userSchema, ValidatorSchema);
export const parameterIdUser = buildIdUser(Schemas.CategoryIdSchema, ValidatorSchema);