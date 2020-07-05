import config from 'config'
import Logger from '../../../drivers/logging/logger'
import { caseCreateCategory, caseGetCategories } from '../useCases/v1/index'
import makeAdapterCreateCategory from './v1/adapterCreateCategory';
import makeAdapterGetCategories from './v1/adapterGetCategory';

const logger = Logger({ config })

const createCategory = makeAdapterCreateCategory({ caseCreateCategory, logger })
const getCategories = makeAdapterGetCategories({ caseGetCategories, logger })


// Object.freeze hace las propiedades del objeto inmutables
const usuarioControlador = Object.freeze({
    createCategory,
    getCategories
})

export default usuarioControlador
export { createCategory, getCategories }