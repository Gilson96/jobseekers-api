import { create, deleteId, findAll, findId } from "../models/application.js";
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

    return Promise.all([
        checkIfExists("job", "job_id", job_id),
        checkIfExists("users", "user_id", user_id),
    ]).then((results) => {
        if (!results) {
            return res.status(404).send({ msg: "Job or User not found!" });
        } else {
            return create(job_id, user_id).then((application: Application[]) => {
                return res.status(201).send({ application: application[0] });
            });
        }
    });
};

export const findAllApplication = (req: Request, res: Response) => {
    return findAll().then((applications: Application[]) => {
        return res.status(200).send(applications);
    });
};

export const findIdApplication = (req: Request, res: Response) => {
    const application_id = req.params.application_id!;

    return checkIfExists("application", "application_id", application_id).then(
        (result) => {
            if (!result) {
                return res.status(404).send({ msg: "Application not found" });
            } else {
                return findId(Number(application_id)).then((application: Application[]) => {
                    return res.status(200).send({ application: application[0] });
                });
            }
        }
    );
};

export const deleteApplication = (req: Request, res: Response) => {
    const application_id = req.params.application_id!;
    const field = Object.keys(req.params)[0]!;

    return checkIfExists('application', field, application_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "application not found" });
        } else {
            return deleteId(Number(application_id)).then((application: Application[]) => {
                return res.status(204).send({ application: application[0] });
            });
        }
    });
};
