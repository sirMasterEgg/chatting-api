import { NextFunction, Request, Response } from "express";
import { IRegister } from "../interfaces/auth.interface";
import authSchema from "../validations/auth.validation";
import { BadRequestExceptions } from "../errors/client.exception";

const login = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ message: 'Login' });
};
const register = async (req: Request, res: Response): Promise<Response> => {
    const reqBody = req.body as IRegister;

    try {
        await authSchema.validateAsync(reqBody);
    } catch (error) {
        throw new BadRequestExceptions('Invalid Request Body');
    }



    return res.status(200).json({ message: reqBody });
};
const logout = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ message: 'Logout' });
};

const refreshToken = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ message: 'Refresh Token' });
};

export const registerWrapper = (req: Request, res: Response, next: NextFunction): void => {
    void register(req, res).catch(next);
};

export const loginWrapper = (req: Request, res: Response, next: NextFunction): void => {
    void login(req, res).catch(next);
};

export const logoutWrapper = (req: Request, res: Response, next: NextFunction): void => {
    void logout(req, res).catch(next);
};

export const refreshTokenWrapper = (req: Request, res: Response, next: NextFunction): void => {
    void refreshToken(req, res).catch(next);
};