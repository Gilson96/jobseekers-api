import { create, findAll } from "../models/applicationJob.js";
import type { Application_job, AuthRequest } from "../types/index.js";
import { checkIfExists } from "../utils/checkIfExists.js";
import type { Request, Response } from "express";


export const createApplicationJob = (req: Request, res: Response) => {
    const { application_id }: { application_id: number } = req.body;
    const { job_id }: { job_id: number } = req.body;
    const { guest_name }: { guest_name: string } = req.body;
    const { guest_email }: { guest_email: string } = req.body;
    const { guest_cv }: { guest_cv: string } = req.body;

    if (application_id === undefined || job_id === undefined) {
        return res.status(400).send({ msg: "Invalid field" });
    }

    if (typeof application_id !== "number" || typeof job_id !== "number") {
        return res.status(400).send({ msg: "Invalid value" });
    }

    return Promise.all([
        checkIfExists("application", "application_id", application_id),
        checkIfExists("job", "job_id", job_id),
    ]).then((results) => {
        if (!results) {
            return res.status(404).send({ msg: "Application or job not found!" });
        } else {
            return create(application_id, job_id, guest_name, guest_email, guest_cv).then((application_job: Application_job[]) => {
                return res.status(201).send({ application_job: application_job[0] });
            });
        }
    });
};

export const findAllApplicationJob = (req: AuthRequest, res: Response) => {
    const job_id = req.params.job_id!
    const role = req.user?.role

    if (role !== 'admin') {
        return res.status(401).send({ msg: 'No access to account' })
    }

    return checkIfExists("job", "job_id", job_id).then((results) => {
        if (!results) {
            return res.status(404).send({ msg: "Application not found" });
        } else {
            return findAll(Number(job_id)).then((application_job: Application_job[]) => {
                return res.status(200).send(application_job);
            });
        }
    });
};

export const uploadCVToApplication = (req: Request, res: Response) => {

} 
