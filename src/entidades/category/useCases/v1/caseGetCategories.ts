import { Category } from '../../../../drivers/typeorm/entities/Category'
import mapper from '../mapper'
import { getRepository } from 'typeorm';

const caseGetCategories = async (data: any) => {
    const categoriesORM = await getRepository(Category).find();
    const result = mapper(categoriesORM)
    return result;
}

export default caseGetCategories;