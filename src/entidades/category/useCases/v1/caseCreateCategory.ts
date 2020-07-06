import {Category} from '../../../../drivers/typeorm/entities/Category'
import { makeCategory } from '../../entity/index';
import mapper from '../mapper'
import { getRepository } from 'typeorm';

const caseCreateCategory = async (data:any) => {
    let category = makeCategory(data)
    let newCategory = {
        name: category.getName(),
        description: category.getDescription()
    }
    const categoryORM = getRepository(Category).create(newCategory);
    const categorySave = await getRepository(Category).save(categoryORM);
    const result = mapper(categorySave)
    return result;
}

export default caseCreateCategory;