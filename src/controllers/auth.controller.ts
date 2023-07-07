import { NextFunction, Request, Response } from "express";
import { ILogin, IRegister, IUserResponse } from "../interfaces/auth.interface";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { BadRequestExceptions } from "../errors/client.exception";
import prisma from "../config/prisma.config";
import bcrypt from 'bcrypt';
import { StatusCode } from "../utils/status_code.utils";
import { User } from "@prisma/client";
import { accessTokenSign, refreshTokenSign } from "../config/jwt.config";
import environment from "../config/environment.config";

const login = async (req: Request, res: Response): Promise<Response> => {
    const reqBody: ILogin = req.body as ILogin;

    try {
        await loginSchema.validateAsync(reqBody);
    } catch (error) {
        throw new BadRequestExceptions('Invalid Request Body');
    }

    const user: User | null = await prisma.user.findUnique({
        where: {
            email: reqBody.email,
        }
    });

    if (!user) {
        throw new BadRequestExceptions('Invalid email or password');
    }

    const isPasswordValid: boolean = await bcrypt.compare(reqBody.password, user.password);

    if (!isPasswordValid) {
        throw new BadRequestExceptions('Invalid email or password');
    }

    const data: IUserResponse = {
        username: user.username,
        email: user.email,
        name: user.name,
    };

    const accessToken: string = accessTokenSign(data);
    const refreshToken: string = refreshTokenSign(data);

    await prisma.user.update({
        where: {
            email: reqBody.email,
        },
        data: {
            refreshToken,
        }
    });

    const maxAge: number = Number(environment.COOKIE_TTL) * 60 * 1000;

    return res
        .status(StatusCode.OK)
        .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: maxAge,
            sameSite: 'none',
            secure: true,
            signed: true,
        })
        .json({
            status: StatusCode.OK,
            message: 'Successfully logged in',
            data: {
                ...data,
                accessToken,
            }
        });
};
const register = async (req: Request, res: Response): Promise<Response> => {
    const reqBody: IRegister = req.body as IRegister;

    try {
        await registerSchema.validateAsync(reqBody);
    } catch (error) {
        throw new BadRequestExceptions('Invalid Request Body');
    }

    const hashedPassword: string = await bcrypt.hash(reqBody.password, 10);

    const user: User = await prisma.user.create({
        data: {
            email: reqBody.email,
            name: reqBody.name,
            password: hashedPassword,
            username: reqBody.username,
        }
    });

    const data: IUserResponse = {
        username: user.username,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
    };

    return res.status(StatusCode.CREATED).json({
        status: StatusCode.CREATED,
        message: 'Successfully registered',
        data,
    });

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