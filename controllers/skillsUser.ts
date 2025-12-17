import { create } from "../models/skillsUser.js";
import type { Skills_user } from "../types/index.js";
import { checkIfExists } from "../utils/checkIfExists.js";
import type { Request, Response } from "express";

export const createSkillsUser = (req: Request, res: Response) => {
    const { skills_id }: { skills_id: number } = req.body;
    const { user_id }: { user_id: number } = req.body;

    if (skills_id === undefined || user_id === undefined) {
        return res.status(400).send({ msg: "Invalid field" });
    }

    if (typeof skills_id !== "number" || typeof user_id !== "number") {
        return res.status(400).send({ msg: "Invalid value" });
    }

    return Promise.all([
        checkIfExists("skills", "skills_id", skills_id),
        checkIfExists("users", "user_id", user_id),
    ]).then((results) => {
        if (!results) {
            return res.status(404).send({ msg: "Skills or User not found!" });
        } else {
            return create(skills_id, user_id).then((skills_user: Skills_user[]) => {
                return res.status(201).send({ skills_user: skills_user[0] });
            });
        }
    });
};
