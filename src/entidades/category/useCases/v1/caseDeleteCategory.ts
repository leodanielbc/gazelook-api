import { Category } from '../../../../drivers/typeorm/entities/Category'
import { parameterIdCategory } from '../../entity/index';
import mapper from '../mapper'
import { getRepository, getConnection } from 'typeorm';

const caseDeleteCategory = async (data: any) => {
    let parameter = parameterIdCategory(data)
    let idparam = {
        id: parameter.getIdCategory()
    }
    const categoryId = await getRepository(Category).findOne(idparam);
    if (categoryId) {
        // await getRepository(Category).delete(categoryId);
        const deleteCategory = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where("id = :id", { id: categoryId.id })
            .execute();
        const result = mapper(deleteCategory);
        console.log("Categoria eliminado")
        return result;
    }
    const result = mapper(categoryId);
    console.log("error")
    return result;
}

export default caseDeleteCategory;