import { Request, Response, response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import jwt from "jsonwebtoken";
import config from '../config/config';
import { Address } from '../entity/Address';
import { Accountuser } from '../entity/Accountuser';
import * as bcryptjs from 'bcryptjs';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const providers = await getRepository(User).find();
    return res.json({ message: "Usuarios", data: providers });
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(User).findOne(req.params.id);
    if (provider)
        return res.json({ message: "Usuario", data: provider });
    return res.status(404).json({ message: "El usuario no existe" });
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        // user
        const newUser = getRepository(User).create(req.body);
        const saveUser: any = await getRepository(User).save(newUser);
        // address
        const address = new Address();
        address.country = req.body.country;
        address.city = req.body.city;
        address.postalCode = req.body.postalCode;
        address.idUser = saveUser.id;
        const newAddress = getRepository(Address).create(address);
        const resultAddres = await getRepository(Address).save(newAddress);
        // account
        const account = new Accountuser();
        account.email = req.body.email;
        account.salt = await bcryptjs.genSalt();
        account.password = await bcryptjs.hash(req.body.password, account.salt);
        account.language = req.body.language;
        account.idUser = saveUser.id;
        const accountUser = getRepository(Accountuser).create(account);
        const resultAccountUser = await getRepository(Accountuser).save(accountUser);

        return res.json({ message: "Usuario registrado", data: saveUser });
    } catch (error) {
        return error();
    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(User).findOne(req.params.id);
    if (provider) {
        getRepository(User).merge(provider, req.body);
        const results = await getRepository(User).save(provider);
        return res.json({ message: "Usuario actualizado", data: results });
    }
    return res.status(404).json({ message: "El usuario no existe" });
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(User).findOne(req.params.id);
    if (provider) {
        const data = { nStatus: 0 };
        getRepository(User).merge(provider);
        const results = await getRepository(User).save(provider);
        return res.json({ message: "Usuario eliminado" });
    }
    return res.status(404).json({ message: "El usuario no existe" });
}