import { create, deleteId } from "../models/skillsJob.js";
import type { AuthRequest, Skills_job } from "../types/index.js";
import { checkIfExists } from "../utils/checkIfExists.js";
import type { Request, Response } from "express";

export const createSkillsJob = (req: Request, res: Response) => {
    const { skills_id }: { skills_id: number } = req.body;
    const { job_id }: { job_id: number } = req.body;

    if (skills_id === undefined || job_id === undefined) {
        return res.status(400).send({ msg: "Invalid field" });
    }

    if (typeof skills_id !== "number" || typeof job_id !== "number") {
        return res.status(400).send({ msg: "Invalid value" });
    }

    return Promise.all([
        checkIfExists("skills", "skills_id", skills_id),
        checkIfExists("job", "job_id", job_id),
    ]).then((results) => {
        if (!results) {
            return res.status(404).send({ msg: "Skills or job not found!" });
        } else {
            return create(skills_id, job_id).then((skills_job: Skills_job[]) => {
                return res.status(201).send({ skills_job: skills_job[0] });
            });
        }
    });
};

export const deleteSkillsJob = (req: AuthRequest, res: Response) => {
    const skills_job_id = req.params.skills_job_id

    const role = req.user?.role

    if (role !== 'user' && role !== 'admin') {
        res.status(401).send({ msg: 'No access to account' })
    }

    return checkIfExists("skills_job", "skills_job_id", Number(skills_job_id)).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "Job or Skill not found" });
        } else {
            return deleteId(Number(skills_job_id)).then(() => {
                return res.status(204).send();
            });
        }
    })
};
