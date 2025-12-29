import { create, findAll, findId, update, deleteId, search } from "../models/job.js"
import type { AuthRequest, Job } from "../types/index.js";
import { checkIfExists } from "../utils/checkIfExists.js";
import type { Request, Response, } from "express";

export const createJob = (req: AuthRequest, res: Response) => {
    const { title }: { title: string } = req.body;
    const { location }: { location: string } = req.body;
    const { pay }: { pay: string } = req.body;
    const { type }: { type: string } = req.body;
    const { company_id }: { company_id: number } = req.body;
    const { description }: { description: { about_us: '', job_details: '', requirements: '', shift_pattern: '' } } = req.body;

    const role = req.user?.role

    const field = Object.keys(req.body);

    const requiredFields = [
        "title",
        "location",
        "pay",
        "type",
        "company_id",
        "description",
    ];

    if (role !== 'admin') {
        return res.status(401).send({ msg: 'No access to account' })
    }

    for (let i = 0; i < field.length; i++) {
        if (field[i] !== requiredFields[i]) {
            return res.status(400).send({ msg: `invalid ${field[i]} field` });
        }
    }

    if (typeof title !== "string" ||
        typeof location !== 'string' ||
        typeof pay !== 'string' ||
        typeof type !== 'string' ||
        typeof company_id !== 'number' ||
        typeof description !== 'object'
    ) {
        return res.status(400).send({ msg: `invalid value` });
    }

    return checkIfExists("company", "company_id", company_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "Company does not exists" });
        } else {
            return create({ title, location, pay, type, company_id, description }).then(
                (job: Job[]) => {
                    return res.status(201).send({ job: job[0] });
                }
            );
        }
    })
};

export const findAllJobs = (req: Request, res: Response) => {
    return findAll().then((jobs: Job[]) => {
        return res.status(200).send(jobs);
    });
};

export const findJobById = (req: Request, res: Response) => {
    const job_id = req.params.job_id!;
    const field = Object.keys(req.params)[0]!;

    return checkIfExists('job', field, job_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "Job not found" });
        } else {
            return findId(Number(job_id)).then((job) => {
                return res.status(200).send({ job: job[0] });
            });
        }
    });
};

export const updateJob = (req: AuthRequest, res: Response) => {
    const job_id = req.params.job_id!;
    const { title }: { title: string } = req.body;
    const { location }: { location: string } = req.body;
    const { pay }: { pay: string } = req.body;
    const { type }: { type: string } = req.body;
    const { description }: { description: { about_us: '', job_details: '', requirements: '', shift_pattern: '' } } = req.body;

    const field = req.body!;
    const role = req.user?.role

    const fieldToUpdate = Object.keys(field)!;
    const value = Object.values(field)!;

    const allowedFields = ["title", "location", "pay", "type", "description"];

    if (role !== 'admin') {
        return res.status(401).send({ msg: 'No access to account' })
    }

    for (let i = 0; i < fieldToUpdate.length; i++) {
        if (!allowedFields.includes(fieldToUpdate[i]!)) {
            return res
                .status(400)
                .send({ msg: `invalid ${fieldToUpdate[i]} field` });
        }
    }

    return checkIfExists("job", "job_id", job_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "Job not found" });
        } else {
            return update({ title, location, pay, type, description, job_id }).then(
                (job: Job[]) => {
                    return res.status(200).send({ job: job[0] });
                }
            );
        }
    });
};

export const deleteJob = (req: AuthRequest, res: Response) => {
    const job_id = req.params.job_id!;
    const role = req.user?.role

    if (role !== 'admin') {
        return res.status(401).send({ msg: 'No access to account' })
    }

    return checkIfExists('job', 'job_id', job_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "Job not found" });
        } else {
            return deleteId(Number(job_id)).then(() => {
                return res.status(204).send();
            });
        }
    })
};

export const searchJob = (req: Request, res: Response) => {
    const job_title = req.query.job_title
    const company_name = req.query.company_name
    const skills_name = req.query.skills_name

    return search(job_title as string, company_name as string, skills_name as string).then((job) => {
        if (job.length === 0) {
            return res.status(404).send({ msg: 'No job found' });
        }
        return res.status(200).send(job);
    });
};
