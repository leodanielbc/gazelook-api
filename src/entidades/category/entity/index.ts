import buildMakeCategory from './categoryEntity'
import Schemas from '../../../drivers/hapi_joi/schemas/index'
import ValidatorSchema from '../../../drivers/hapi_joi/validator/validator'

const makeCategory = buildMakeCategory(Schemas.CategorySchema, ValidatorSchema)

export default makeCategory;