import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import '@shared/container';
import { AppError } from '@errors/AppError';
import createConnection from '@shared/infra/typeorm';
import { router } from './routes';
import swaggerFile from '../../../swagger.json';

createConnection();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router)

// errors
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server error - ${err.message}`
  });
});

export { app }