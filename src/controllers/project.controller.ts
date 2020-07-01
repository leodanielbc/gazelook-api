import { Request, Response, response } from 'express';
import { getRepository } from 'typeorm';
import jwt from "jsonwebtoken";
import config from '../config/config';
import fs from 'fs';
import AWS from 'aws-sdk';
import path from 'path';
import { Project } from '../entity/Project';
import { Contentdigital } from '../entity/Contentdigital';

const s3 = new AWS.S3({
    accessKeyId: config.amazon.accessKeyId,
    secretAccessKey: config.amazon.secretAccessKey
});

export const createProject = async (req: Request, res: Response): Promise<Response> => {
    try {
        // project
        console.log(JSON.stringify(req.params))
        const project = new Project();
        project.title = req.body.title;
        project.shortTitle = req.body.shortTitle;
        project.description = req.body.description;
        project.idUser = req.body.idUser;
        project.idCategory = req.body.idCategory;
        const newProject = getRepository(Project).create(project);
        const saveProject: any = await getRepository(Project).save(newProject);

        return res.json({ message: "Proyecto registrado", data: saveProject });
    } catch (error) {
        return error();
    }
}

export const getProjects = async (req: Request, res: Response): Promise<Response> => {
    const providers = await getRepository(Project).find();
    return res.json({ message: "Projects", data: providers });
}

export const addContent = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Project).findOne(req.params.idProject);
    if (provider) {
        try {
            // contenDigital
            const contentDigital = new Contentdigital();
            contentDigital.digitalContentUrl = req.file.filename;
            contentDigital.idProject = provider.id;
            const newContentDigital = getRepository(Contentdigital).create(contentDigital);
            const result = await getRepository(Contentdigital).save(newContentDigital);

            return res.json({ message: "Contenido Guardado", data: result });
        } catch (error) {
            return error();
        }
    }
    return res.status(404).json({ message: "Error al guardar el contenido digital" });
}

export const getProject = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Project).findOne(req.params.id);
    if (provider)
        return res.json({ message: "Project", data: provider });
    return res.status(404).json({ message: "El proyecto no existe" });
}

export const updateProject = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Project).findOne(req.params.id);
    if (provider) {
        getRepository(Project).merge(provider, req.body);
        const results = await getRepository(Project).save(provider);
        return res.json({ message: "Proyecto actualizado", data: results });
    }
    return res.status(404).json({ message: "El proyecto no existe" });
}

export const updateContent = async (req: Request, res: Response): Promise<Response> => {
    const idProject = req.params.idProject;
    const idContent = req.params.idContent;
    const project = await getRepository(Project).createQueryBuilder("project")
        .where("project.id = :id", { id: idProject })
        .getOne();
    if (project) {
        const content = await getRepository(Contentdigital).createQueryBuilder("contentdigital")
            .where("contentdigital.id = :id", { id: idContent })
            .getOne();
        if (content) {
            content.digitalContentUrl = req.file.filename;
            getRepository(Contentdigital).merge(content);
            const results = await getRepository(Contentdigital).save(content);
            return res.json({ message: "Contenido Actualizado", data: results });
        }
    }
    return res.status(404).json({ message: "El Proyecto o Contenido no existe" });
}

export const getImageContent = async (req: Request, res: Response): Promise<any> => {
    const provider: any = await getRepository(Contentdigital).findOne(req.params.idContent);
    if (provider) {
        if (!provider.digitalContentUrl) return res.status(404).json({ message: "El contenido digital del proyecto no existe" });
        const getObjectParametros: any = {
            Bucket: "gazelook-s3-storage/contentProject",
            Key: `${provider.digitalContentUrl}`
        };
        const path_file = `./temporal/${provider.digitalContentUrl}`;
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
    return res.status(404).json({ message: "Elemento no encontrado" });
}

export const deleteContent = async (req: Request, res: Response): Promise<Response> => {
    const provider = await getRepository(Contentdigital).findOne(req.params.id);
    if (provider) {
        const data = { nStatus: 0 };
        getRepository(Contentdigital).delete(provider);
        //const results = await getRepository(Category).save(provider);
        return res.json({ message: "Contenido digital eliminado" });
    }
    return res.status(404).json({ message: "No existe el contenido" });
}