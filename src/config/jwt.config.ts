import jwt, { JwtPayload } from 'jsonwebtoken';
import environment from './environment.config';
import { UnauthorizedExceptions } from '../errors/client.exception';

export const accessTokenSign = (payload: object): string => {
    return jwt.sign(payload, environment.ACCESS_TOKEN_SECRET, {
        expiresIn: `${environment.ACCESS_TOKEN_TTL}m`,
    });
};

export const accessTokenVerify = (token: string): string | JwtPayload | never => {
    try {
        return jwt.verify(token, environment.ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        throw new UnauthorizedExceptions('Invalid access token');
    }
};

export const refreshTokenSign = (payload: object): string => {
    return jwt.sign(payload, environment.REFRESH_TOKEN_SECRET, {
        expiresIn: `${environment.REFRESH_TOKEN_TTL}m`,
    });
};

export const refreshTokenVerify = (token: string): string | JwtPayload | never => {
    try {
        return jwt.verify(token, environment.REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        throw new UnauthorizedExceptions('Invalid refresh token');
    }
};