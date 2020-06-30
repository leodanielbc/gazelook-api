import { Request, Response, response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';

export const getCategories = async (req: Request, res: Response): Promise<Response> => {
    const providers = await getRepository(Category).find();
    return res.json({ message: "Categorias", data: providers });
}

export const getCategory = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Category).findOne(req.params.id);
    if (provider)
        return res.json({ message: "Categoria", data: provider });
    return res.status(404).json({ message: "La categoria no existe" });
}

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(Category).create(req.body);
    const results = await getRepository(Category).save(newUser);
    return res.json({ message: "Categoria creada", data: results });
}

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Category).findOne(req.params.id);
    if (provider) {
        getRepository(Category).merge(provider, req.body);
        const results = await getRepository(Category).save(provider);
        return res.json({ message: "Categoria actualizado", data: results });
    }
    return res.status(404).json({ message: "La categoria no existe" });
}

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Category).findOne(req.params.id);
    if (provider) {
        const data = { nStatus: 0 };
        getRepository(Category).delete(provider);
        //const results = await getRepository(Category).save(provider);
        return res.json({ message: "Categoria eliminado" });
    }
    return res.status(404).json({ message: "La categoria no existe" });
}