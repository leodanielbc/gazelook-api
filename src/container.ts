import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm';

import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import config from 'config';


import rutas from './drivers/routes/api_v1';
import bodyParser from 'body-parser';
import makeCallback from './drivers/express-callback';
import Logger from './drivers/logging/logger';
import notFound from './drivers/not-found/not-found';

class Server {
    app = express()
    port = (config.get('port')) ? config.get('port') : 3000
    logger = Logger({ config })

    applyMiddlewares(logger: any) {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(bodyParser.json())
        rutas.forEach(r => {
            this.app.use(r.group, r.rutas)
        })
        this.app.use(makeCallback(notFound, logger))
    }

    async start() {
        const logger = Logger({ config })
        this.applyMiddlewares(logger)
        createConnection().then(() => {
            this.app.listen(this.port, async () => {
                console.log(config.get('port'))
                console.log(this.port)
                this.logger.level = 'info'
                this.logger.info(`listening to port:${this.port}`)
            });
        }).catch(err => {
            console.log(`Error conection Data Base: ${err}`);
        });
    }
}

export const server = new Server();