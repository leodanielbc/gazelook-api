import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { getRepository } from "typeorm";

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['authorization'];
    let jwtPayload;

    // const tokenTest = jwt.sign({ data: { cKey: "97dg2397gd", idProvider: 3 } }, config.jwtSecret, { expiresIn: '24h' });
    // console.log(tokenTest);

    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);

        // const cApiKey = await getRepository(ApiKeys).find({ where: { cKey: jwtPayload.data.cKey } });
        // if (cApiKey.length == 0) {
        //     return res.status(401).send({ message: 'No autorizado' });
        // }
        res.locals.jwtPayload = jwtPayload;
    } catch (e) {
        return res.status(401).send({ message: 'No autorizado' });
    }
    next();
}