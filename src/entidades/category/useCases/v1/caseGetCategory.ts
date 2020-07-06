import { Category } from '../../../../drivers/typeorm/entities/Category'
import { parameterIdCategory } from '../../entity/index';
import mapper from '../mapper'
import { getRepository } from 'typeorm';

const caseGetCategory = async (data: any) => {
    let parameter = parameterIdCategory(data)
    let idparam = {
        id: parameter.getIdCategory()
    }
    const categoryId = await getRepository(Category).findOne(idparam);
    const result = mapper(categoryId);
    return result;
}

export default caseGetCategory;