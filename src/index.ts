import { config } from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import router from './routes/index.route';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { pageNotFound } from './controllers/index.controller';
import { errorHandler } from './errors/index.exception';
import prisma from './config/prisma.config';
import environmentSchema from './validations/environment.validation';
config();

const app: Express = express();
const PORT = process.env.PORT || 3000 as number;
const MONGODB_URL = process.env.MONGODB_DATABASE_URL as string;

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('X-Powered-By', false);
app.set('Content-Type', 'application/json');

app.use('/api/v1', router);

app.use(errorHandler);
app.all('*', pageNotFound);

const run = () => {
    console.log('Checking environment variables...');

    const { error } = environmentSchema.validate(process.env);
    if (error) {
        console.log('Invalid environment variables');
        console.log(error);
        return;
    }
    console.log('Environment variables are valid');

    console.log('Connecting to DB...');
    const dbConnection = Promise.all([mongoose.connect(MONGODB_URL), prisma.$connect()]);

    dbConnection.then(([mongoose,]) => {
        console.log(mongoose.connection.readyState === 1 ? 'Connected to MongoDB' : 'Failed to connect to MongoDB');
        console.log('Connected to MysqlDB');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((err) => {
        console.log('Failed to connect to both DB');
        console.log(err);
    }).finally(() => {
        prisma.$disconnect();
    });
};

run();