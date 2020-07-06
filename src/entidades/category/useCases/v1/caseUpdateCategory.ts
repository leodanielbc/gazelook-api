import { Category } from '../../../../drivers/typeorm/entities/Category'
import { parameterIdCategory, makeCategory } from '../../entity/index';
import mapper from '../mapper'
import { getRepository } from 'typeorm';

const caseUpdateCategory = async (data: any, params: any) => {
    let parameter = parameterIdCategory(params);
    console.log('param: ');
    console.log(JSON.stringify(parameter));
    let category = makeCategory(data);
    let idparam = {
        id: parameter.getIdCategory()
    }
    let updateCategory = {
        name: category.getName(),
        description: category.getDescription()
    }
    const categoryId = await getRepository(Category).findOne(idparam);
    if (categoryId) {
        getRepository(Category).merge(categoryId, updateCategory);
        const categoryUpdate = await getRepository(Category).save(categoryId);
        const result = mapper(categoryUpdate);
        return result;
    }
    const result = mapper(categoryId);
    return result;
}

export default caseUpdateCategory;