import { Request, Response, response } from 'express';
import { getRepository } from 'typeorm';
import { Address } from '../entity/Address';

export const getAddressId = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Address).findOne(req.params.id);
    if (provider)
        return res.json({ message: "Direccion", data: provider });
    return res.status(404).json({ message: "La direccion no existe" });
}

export const createAddress = async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(Address).create(req.body);
    const results = await getRepository(Address).save(newUser);
    return res.json({ message: "Direccion creada", data: results });
}

export const updateAddress = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Address).findOne(req.params.id);
    if (provider) {
        getRepository(Address).merge(provider, req.body);
        const results = await getRepository(Address).save(provider);
        return res.json({ message: "Direccion actualizado", data: results });
    }
    return res.status(404).json({ message: "La direccion no existe" });
}

export const deleteAddress = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Address).findOne(req.params.id);
    if (provider) {
        const data = { nStatus: 0 };
        getRepository(Address).delete(provider);
        return res.json({ message: "Direccion eliminado" });
    }
    return res.status(404).json({ message: "La direccion no existe" });
}