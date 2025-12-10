import { create, findAll } from "../models/saved_job.js";
import type { Saved_job } from "../types/index.js";
import { checkIfExists } from "../utils/checkIfExists.js";
import type { Request, Response } from "express";

export const createSavedJob = (req: Request, res: Response) => {
    const { user_id }: { user_id: number } = req.body;
    const { job_id }: { job_id: number } = req.body;

    if (job_id === undefined || user_id === undefined) {
        return res.status(400).send({ msg: "Invalid field" });
    }

    if (typeof job_id !== "number" || typeof user_id !== "number") {
        return res.status(400).send({ msg: "Invalid value" });
    }

    return Promise.all([
        checkIfExists("users", "user_id", user_id),
        checkIfExists("job", "job_id", job_id),
    ]).then((results) => {
        if (!results) {
            return res.status(404).send({ msg: "Job or User not found!" });
        } else {
            return create(user_id, job_id).then((saved_job: Saved_job[]) => {
                return res.status(201).send({ saved_job: saved_job[0] });
            });
        }
    });
};

export const findAllSavedJob = (req: Request, res: Response) => {
    const user_id = req.params.user_id!;

    return checkIfExists("users", "user_id", user_id).then(
        (result) => {
            if (!result) {
                return res.status(404).send({ msg: "User not found" });
            } else {
                return findAll(Number(user_id)).then((saved_job: Saved_job[]) => {
                    return res.status(200).send({ saved_job: saved_job[0] });
                });
            }
        }
    );
};

export const deleteSavedJob = (req: Request, res: Response) => {
    const saved_job_id = req.params.saved_job_id!;

    return checkIfExists("saved_job", "saved_job_id", saved_job_id).then(
        (result) => {
            if (!result) {
                return res.status(404).send({ msg: "Saved job not found" });
            } else {
                return findAll(Number(saved_job_id)).then((saved_job: Saved_job[]) => {
                    return res.status(204).send({ saved_job: saved_job[0] });
                });
            }
        }
    );
};