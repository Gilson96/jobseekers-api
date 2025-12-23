import { create } from "../models/application.js";
import type { Application } from "../types/index.js";
import { checkIfExists } from "../utils/checkIfExists.js"
import type { Request, Response } from "express";
import { v2 } from 'cloudinary'

const cloudinary = v2.config({ secure: true })

export const createApplication = (req: Request, res: Response) => {
    const { job_id }: { job_id: number } = req.body;
    const { user_id }: { user_id: number } = req.body;
    const cv = req.file!

    console.log(req.file)
    if (job_id === undefined || user_id === undefined) {
        return res.status(400).send({ msg: "Invalid field" });
    }

    if (typeof job_id !== "number" || typeof user_id !== "number") {
        return res.status(400).send({ msg: "Invalid value" });
    }

    return Promise.all([
        checkIfExists("job", "job_id", job_id),
        checkIfExists("users", "user_id", user_id),
    ]).then((results) => {
        if (!results) {
            return res.status(404).send({ msg: "Job or User not found!" });
        } else {
            return create(job_id, user_id, cv).then((application: Application[]) => {
                return res.status(201).send({ application: application[0] });
            });
        }
    });
};
