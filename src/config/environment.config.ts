import { IEnvironment } from "../interfaces/environment.interface";

const environment: IEnvironment = {
    MONGODB_DATABASE_URL: process.env.MONGODB_DATABASE_URL as string,
    MYSQL_DATABASE_URL: process.env.MYSQL_DATABASE_URL as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL as string,
    REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL as string,
    COOKIE_TTL: process.env.COOKIE_TTL as string,
};

export default environment;