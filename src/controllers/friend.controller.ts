import { NextFunction, Request, Response } from "express";
import { IAddFriend, IAddFriendResponse } from "../interfaces/friend.interface";
import prisma from "../config/prisma.config";
import { IJwtPayload } from "../interfaces/auth.interface";
import { BadRequestExceptions, NotFoundExceptions } from "../errors/client.exception";
import { addFriendSchema } from "../validations/friend.validation";
import { StatusCode } from "../utils/status_code.utils";

const addFriend = async (req: Request, res: Response): Promise<Response> => {
    const { targetEmail, targetUsername }: IAddFriend = req.body;
    const { email, username }: IJwtPayload = res.locals.user;

    if (targetEmail === email || targetUsername === username) {
        throw new BadRequestExceptions('You cannot add yourself');
    }

    try {
        addFriendSchema.validateAsync({ targetEmail, targetUsername });
    }
    catch (err) {
        throw new BadRequestExceptions('Invalid target email or username');
    }

    const user1Data = targetEmail ? { email: targetEmail } : { username: targetUsername };

    try {
        const friend = await prisma.friend.create({
            data: {
                user1: {
                    connect: {
                        email: email
                    }
                },
                user2: {
                    connect: user1Data
                },
            },
            include: {
                user1: {
                    select: {
                        email: true,
                        name: true,
                        username: true,
                    }
                },
                user2: {
                    select: {
                        email: true,
                        name: true,
                        username: true,
                    }
                },
            },
        });

        const data: IAddFriendResponse = {
            sender: friend.user1,
            receiver: friend.user2,
            status: friend.status,
            createdAt: friend.createdAt,
        };

        return res.status(StatusCode.OK).json({
            status: StatusCode.OK,
            message: 'Successfully add friend',
            data
        });
    }
    catch (err) {
        throw new NotFoundExceptions('User not found');
    }
};

export const addFriendWrapper = (req: Request, res: Response, next: NextFunction) => {
    void addFriend(req, res).catch(next);
};