import { create, findId } from "../models/applicationUser.js";
import type { Application_user } from "../types/index.js";
import { checkIfExists } from "../utils/checkIfExists.js";
import type { Request, Response } from "express";

export const createApplicationUser = (req: Request, res: Response) => {
    const { application_id }: { application_id: number } = req.body;
    const { user_id }: { user_id: number } = req.body;

    if (application_id === undefined || user_id === undefined) {
        return res.status(400).send({ msg: "Invalid field" });
    }

    if (typeof application_id !== "number" || typeof user_id !== "number") {
        return res.status(400).send({ msg: "Invalid value" });
    }

    return Promise.all([
        checkIfExists("application", "application_id", application_id),
        checkIfExists("users", "user_id", user_id),
    ]).then((results) => {
        if (!results) {
            return res.status(404).send({ msg: "Application or User not found!" });
        } else {
            return create(application_id, user_id).then((application_user: Application_user[]) => {
                return res.status(201).send({ application_user: application_user[0] });
            });
        }
    });
};

export const findIdApplicationUser = (req: Request, res: Response) => {
    const user_id = req.params.user_id!;

    return checkIfExists("users", "user_id", user_id).then(
        (result) => {
            if (!result) {
                return res.status(404).send({ msg: "User not found" });
            } else {
                return findId(Number(user_id)).then((application_user: Application_user[]) => {
                    return res.status(200).send({ application_user: application_user[0] });
                });
            }
        }
    );
};