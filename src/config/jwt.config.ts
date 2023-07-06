import jwt from 'jsonwebtoken';
import environment from './environment.config';

export const accessTokenSign = (payload: object): string => {
    return jwt.sign(payload, environment.ACCESS_TOKEN_SECRET, {
        expiresIn: environment.ACCESS_TOKEN_TTL,
    });
};