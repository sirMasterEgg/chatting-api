import { config } from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
config();

const app: Express = express();
const PORT = process.env.PORT || 3000 as number;
const DB_URL = process.env.DATABASE_URL as string;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const run = () => {
    console.log('Connecting to DB...');
    mongoose.connect(DB_URL).then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
};

run();