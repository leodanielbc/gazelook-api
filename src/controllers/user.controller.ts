import { Request, Response, response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import jwt from "jsonwebtoken";
import config from '../config/config';
import { Address } from '../entity/Address';
import { Accountuser } from '../entity/Accountuser';
import * as bcryptjs from 'bcryptjs';
import fs from 'fs';
import AWS from 'aws-sdk';
import path from 'path';

const s3 = new AWS.S3({
    accessKeyId: config.amazon.accessKeyId,
    secretAccessKey: config.amazon.secretAccessKey
});

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    // const providers = await getRepository(User).find();
    const providers = await getRepository(User).createQueryBuilder("user")
        .where("user.active = :active", { active: 1 || null })
        .getMany();
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
        const user = new User();
        user.name = req.body.name;
        user.lastname = req.body.lastname;
        user.contactName = req.body.contactName;
        user.profileType = req.body.profileType;
        user.active = true;
        const newUser = getRepository(User).create(user);
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
        provider.active = false;
        getRepository(User).merge(provider);
        const results = await getRepository(User).save(provider);
        return res.json({ message: "Usuario eliminado" });
    }
    return res.status(404).json({ message: "El usuario no existe" });
}

export const uploadImage = async (req: Request, res: Response): Promise<Response> => {
    const idUser = req.params.userId;
    const provider = await getRepository(User).createQueryBuilder("user")
        .where("user.id = :id", { id: idUser })
        .getOne();
    if (provider) {
        provider.imageUrl = req.file.filename;
        getRepository(User).merge(provider, req.body);
        const results = await getRepository(User).save(provider);
        return res.json({ message: "Imagen Subida satisfactoriamente", data: results });
    }
    return res.status(404).json({ message: "El usuario no existe" });
}

export const getImageProfile = async (req: Request, res: Response): Promise<any> => {
    const provider: any = await getRepository(User).findOne(req.params.id);
    if (provider) {
        if (!provider.imageUrl) return res.status(404).json({ message: "El usuario no tiene imagem" });
        const getObjectParametros: any = {
            Bucket: "gazelook-s3-storage/perfilUser",
            Key: `${provider.imageUrl}`
        };
        const path_file = `./temporal/${provider.imageUrl}`;
        await s3.getObject(getObjectParametros, (err, data: any) => {
            if (err) throw err;
            fs.writeFile(path.resolve(path_file), data.Body, 'binary', (err) => {
                if (err) throw err;
                console.log("imagen cargada");
            });
        });
        const file = await path.resolve(path_file);
        return res.sendFile(file);
    }
    return res.status(404).json({ message: "El usuario no existe" });
}