import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { AuthRequest } from "../types/index.js";

export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).send({ msg: 'Authentication failed' })
        }

        const decoded = jwt.verify(token, 'c_cret_password', { algorithms: ["HS256"] }) as JwtPayload;

        req.user = decoded

        next();
    } catch (err) {

        console.log(err)
        return res.status(401).json({ msg: 'Authentication failed' });
    }
}
