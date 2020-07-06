import config from 'config'
import Logger from '../../../drivers/logging/logger'
import { caseCreateCategory, caseGetCategories, caseGetCategory, caseUpdateCategory, caseDeleteCategory } from '../useCases/v1/index'
import makeAdapterCreateCategory from './v1/adapterCreateCategory';
import makeAdapterGetCategories from './v1/adapterGetCategories';
import makeAdapterGetCategoryId from './v1/adapterGetCategoryId ';
import makeAdapterUpdateCategory from './v1/adapterUpdateCategory';
import makeAdapterDeleteCategory from './v1/adapterDeleteCategory';

const logger = Logger({ config })

const createCategory = makeAdapterCreateCategory({ caseCreateCategory, logger });
const getCategories = makeAdapterGetCategories({ caseGetCategories, logger });
const getCategory = makeAdapterGetCategoryId({ caseGetCategory, logger });
const updateCategory = makeAdapterUpdateCategory({ caseUpdateCategory, logger });
const deleteCategory = makeAdapterDeleteCategory({ caseDeleteCategory, logger });


// Object.freeze hace las propiedades del objeto inmutables
const usuarioControlador = Object.freeze({
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
})

export default usuarioControlador;
export { createCategory, getCategories, getCategory, updateCategory, deleteCategory }