import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm';
import routes from './routes/index.routes';

import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';


const port = process.env.PORT || 4000;

const app = express();
createConnection();

//Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port);

console.log('Server on port ', port)