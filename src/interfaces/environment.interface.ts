export interface IEnvironment {
    MONGODB_DATABASE_URL: string;
    MYSQL_DATABASE_URL: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_TTL: string;
    REFRESH_TOKEN_TTL: string;
    COOKIE_TTL: string;
    COOKIE_SECRET: string;
}