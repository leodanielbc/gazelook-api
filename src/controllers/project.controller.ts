import { Request, Response, response } from 'express';
import { getRepository } from 'typeorm';
import jwt from "jsonwebtoken";
import config from '../config/config';
import fs from 'fs';
import AWS from 'aws-sdk';
import path from 'path';
import { Project } from '../entity/Project';
import { Contentdigital } from '../entity/Contentdigital';

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
    const provider = await getRepository(Project).findOne(req.params.id);
    if (provider){
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