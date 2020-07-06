import categoryRoutes from '../../entidades/category/drivers/category_api_v1';
import userRoutes from '../../entidades/user/drivers/user_api_v1';

export default [
    {
        group: '/api/category',
        rutas: categoryRoutes
    },
    {
        group: '/api/user',
        rutas: userRoutes
    },
]