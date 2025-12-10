import { create, deleteId, findAll, findId, update } from "../models/skills.js";
import type { Skills } from "../types/index.js";
import { checkIfExists } from "../utils/checkIfExists.js";
import type { Request, Response } from "express";

export const createSkill = (req: Request, res: Response) => {
    const { skills_name }: { skills_name: string } = req.body;
    const field = Object.keys(req.body)[0]!;

    if (skills_name === undefined) {
        return res.status(400).send({ msg: "Invalid field" });
    }

    if (typeof skills_name !== "string") {
        return res.status(400).send({ msg: "Invalid value" });
    }

    return checkIfExists('skills', field, skills_name).then((result) => {
        if (result) {
            return res.status(400).send({ msg: "Skills name already exists" })
        } else {
            return create(skills_name).then((skills: Skills[]) => {
                return res.status(201).send({ skills: skills[0] })
            })
        }
    })
}

export const findAllSkills = (req: Request, res: Response) => {
    return findAll().then((skills: Skills[]) => {
        return res.status(200).send(skills);
    });
};

export const findIdskills = (req: Request, res: Response) => {
    const skills_id = req.params.skills_id!;
    const field = Object.keys(req.params)[0]!;

    return checkIfExists('skills', field, skills_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "Skill not found" })
        } else {
            return findId(Number(skills_id)).then((skills: Skills[]) => {
                return res.status(200).send({ skills: skills[0] })
            })
        }
    })
};

export const updateSkills = (req: Request, res: Response) => {
    const skills_id = req.params.skills_id!;
    const { skills_name }: { skills_name: string } = req.body;
    const field = Object.keys(req.params)[0]!;

    if (skills_name === undefined) {
        return res.status(400).send({ msg: "Invalid field" });
    }

    if (typeof skills_name !== "string") {
        return res.status(400).send({ msg: "Invalid value" });
    }

    return checkIfExists('skills', field, skills_id).then(
        (result) => {
            if (!result) {
                return res.status(404).send({ msg: "Skill not found" });
            } else {
                return update(skills_name, Number(skills_id)).then((skills: Skills[]) => {
                    return res.status(200).send({ skills: skills[0] });
                });
            }
        }
    );
};

export const deleteSkills = (req: Request, res: Response) => {
    const skills_id = req.params.skills_id!;
    const field = Object.keys(req.params)[0]!;

    return checkIfExists('skills', field, skills_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "skills not found" });
        } else {
            return deleteId(Number(skills_id)).then((skills: Skills[]) => {
                return res.status(204).send({ skills: skills[0] });
            });
        }
    });
};