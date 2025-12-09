import type { Request, Response, NextFunction } from "express";
import type { ErrorHandler } from "../types/index.js";

export const handlePsqlError = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Invalid params" });
    } else {
        next(err);
    }
};

export const handleCustomError = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    if (err.status && err.msg) {
        return res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
};

export const handleSeverError = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).send({ msg: "Somenthing went wrong!" });
};