import { NextFunction, Request, Response } from "express";
import { UnauthorizedExceptions } from "../errors/client.exception";
import { accessTokenVerify } from "../config/jwt.config";
import { IJwtPayload } from "../interfaces/auth.interface";

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const accessToken: string = req.headers.authorization || req.headers.Authorization as string;

    if (!accessToken) {
        throw new UnauthorizedExceptions('Missing access token');
    }

    if (!accessToken.startsWith('Bearer ')) {
        throw new UnauthorizedExceptions('Invalid access token');
    }

    const token: string = accessToken.split(' ')[1];

    const data: IJwtPayload = accessTokenVerify(token) as IJwtPayload;

    delete data.iat;
    delete data.exp;

    res.locals.user = data;
    next();
};