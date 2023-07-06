import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { BadRequestExceptions, ForbiddenExceptions, NotFoundExceptions, TooManyRequestsExceptions, UnauthorizedExceptions } from "./client.exception";
import { StatusCode } from "../utils/status_code.utils";

export const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): Response | void => {

    if (err instanceof BadRequestExceptions) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: StatusCode.BAD_REQUEST,
            message: err.message,
        });
    }
    if (err instanceof NotFoundExceptions) {
        return res.status(StatusCode.NOT_FOUND).json({
            status: StatusCode.NOT_FOUND,
            message: err.message,
        });
    }
    if (err instanceof ForbiddenExceptions) {
        return res.status(StatusCode.FORBIDDEN).json({
            status: StatusCode.FORBIDDEN,
            message: err.message,
        });
    }
    if (err instanceof UnauthorizedExceptions) {
        return res.status(StatusCode.UNAUTHORIZED).json({
            status: StatusCode.UNAUTHORIZED,
            message: err.message,
        });
    }
    if (err instanceof TooManyRequestsExceptions) {
        return res.status(StatusCode.TOO_MANY_REQUESTS).json({
            status: StatusCode.TOO_MANY_REQUESTS,
            message: err.message,
        });
    }

    res.status(StatusCode.INTERNAL_SERVER).json({
        status: StatusCode.INTERNAL_SERVER,
        message: 'Internal Server Error',
    });

    next();
};