import { Request, Response } from "express";

export const pageNotFound = (req: Request, res: Response): Response => {
    return res.status(404).json({ message: 'Are you lost?' });
};