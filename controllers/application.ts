import { create } from "../models/application.js";
import type { Application } from "../types/index.js";
import { checkIfExists } from "../utils/checkIfExists.js"
import type { Request, Response } from "express";

export const createApplication = (req: Request, res: Response) => {
    const { job_id }: { job_id: number } = req.body;
    const { user_id }: { user_id: number } = req.body;

    if (job_id === undefined || user_id === undefined) {
        return res.status(400).send({ msg: "Invalid field" });
    }

    if (typeof job_id !== "number" || typeof user_id !== "number") {
        return res.status(400).send({ msg: "Invalid value" });
    }

    return checkIfExists("job", "job_id", job_id).then((results) => {
        if (!results) {
            return res.status(404).send({ msg: "Job or User not found!" });
        } else {
            return create(job_id, user_id).then((application: Application[]) => {
                return res.status(201).send({ application: application[0] });
            });
        }
    });
};
