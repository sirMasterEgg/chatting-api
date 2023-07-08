import { Request, Response } from "express";
import { StatusCode } from "../utils/status_code.utils";

export const pageNotFound = (req: Request, res: Response): Response => {
    return res.status(StatusCode.NOT_FOUND).json({ message: 'Are you lost?' });
};