import { Request, Response, response } from 'express';
import { getRepository } from 'typeorm';
import { Accountuser } from '../drivers/typeorm/entities/Accountuser';

export const getAccountUserId = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Accountuser).findOne(req.params.id);
    if (provider)
        return res.json({ message: "Cuenta de Usuario", data: provider });
    return res.status(404).json({ message: "La Cuenta de Usuario no existe" });
}

export const createAccountUser = async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(Accountuser).create(req.body);
    const results = await getRepository(Accountuser).save(newUser);
    return res.json({ message: "Cuenta de Usuario creada", data: results });
}

export const updateAccountUser = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Accountuser).findOne(req.params.id);
    if (provider) {
        getRepository(Accountuser).merge(provider, req.body);
        const results = await getRepository(Accountuser).save(provider);
        return res.json({ message: "Cuenta de Usuario actualizado", data: results });
    }
    return res.status(404).json({ message: "La Cuenta de Usuario no existe" });
}

export const deleteAccountUser = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Accountuser).findOne(req.params.id);
    if (provider) {
        const data = { nStatus: 0 };
        getRepository(Accountuser).delete(provider);
        return res.json({ message: "Cuenta de Usuario eliminado" });
    }
    return res.status(404).json({ message: "La Cuenta de Usuario no existe" });
}