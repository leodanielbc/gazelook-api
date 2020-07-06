import config from 'config'
import Logger from '../../../drivers/logging/logger'
import { caseCreateUser } from '../useCases/v1/index'
import makeAdapterCreateUser from './v1/adapterCreateUser';


const logger = Logger({ config })

const createUser = makeAdapterCreateUser({ caseCreateUser, logger });


// Object.freeze hace las propiedades del objeto inmutables
const usuarioControlador = Object.freeze({
    createUser,
})

export default usuarioControlador;
export { createUser }