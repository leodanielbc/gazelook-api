import { buildMakeCategory, buildIdCategory } from './categoryEntity'
import Schemas from '../../../drivers/hapi_joi/schemas/index'
import ValidatorSchema from '../../../drivers/hapi_joi/validator/validator'

export const makeCategory = buildMakeCategory(Schemas.CategorySchema, ValidatorSchema);
export const parameterIdCategory = buildIdCategory(Schemas.CategoryIdSchema, ValidatorSchema);