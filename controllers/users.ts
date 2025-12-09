import type { Request, Response } from "express";
import { create, findId, update, deleteId } from "../models/users.js"
import { checkIfExists } from "../utils/checkIfExists.js"

export const createUser = (req: Request, res: Response) => {
    const { name }: { name: string } = req.body;
    const { email }: { email: string } = req.body;
    const { password }: { password: string } = req.body;
    const { number }: { number: string } = req.body;
    const { address }: { address: string } = req.body;
    const { cv }: { cv: string } = req.body;

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const requiredFields = [
        "name",
        "email",
        "password",
        "number",
        "address",
        "cv",
    ];

    for (let i = 0; i < fields.length; i++) {
        if (fields[i] !== requiredFields[i]) {
            return res.status(400).send({ msg: `invalid ${fields[i]} field` });
        }
        if (typeof values[i] !== 'string') {
            return res.status(400).send({ msg: `invalid ${fields[i]} value` });
        }
    }

    return checkIfExists("users", "email", email).then((result) => {
        if (result) {
            return res.status(400).send({ msg: "User email already exists" });
        } else {
            return create({ name, email, password, number, address, cv })
                .then((user) => {
                    return res.status(201).send({ user: user[0] });
                });
        }
    });
};

export const findIdUser = (req: Request, res: Response) => {
    const user_id = req.params.user_id!;
    const field = Object.keys(req.params)[0]!;

    return checkIfExists("users", field, user_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "User not found" });
        } else {
            return findId(Number(user_id)).then((user) => {
                return res.status(200).send({ user: user[0] });
            });
        }
    });
};

export const updateUser = (req: Request, res: Response) => {
    const user_id = req.params.user_id!
    const { name }: { name: string } = req.body!;
    const { email }: { email: string } = req.body!;
    const { password }: { password: string } = req.body!;
    const { number }: { number: string } = req.body!;
    const { address }: { address: string } = req.body!;
    const { cv }: { cv: string } = req.body!;

    const fields = req.body!;
    const fieldToUpdate = Object.keys(fields)!;
    const valueToUpdate = Object.values(fields)!;

    const allowedFields = [
        "name",
        "email",
        "password",
        "number",
        "address",
        "cv",
    ];

    for (let i = 0; i < fieldToUpdate.length; i++) {
        if (!allowedFields.includes(fieldToUpdate[i]!)) {
            return res.status(400).send({ msg: `invalid ${fieldToUpdate[i]} field` });
        }
        if ((valueToUpdate[i] !== undefined && typeof valueToUpdate[i] !== 'string')) {
            return res.status(400).send({ msg: `invalid ${fieldToUpdate[i]} field` });
        }
    }

    return checkIfExists("users", "user_id", user_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "User not found" });
        } else {
            return update({ name, email, password, number, address, cv, user_id })
                .then((user) => {
                    return res.status(200).send({ user: user[0] });
                });
        }
    });
};

export const deleteUser = (req: Request, res: Response) => {
    const user_id = req.params.user_id!;

    return checkIfExists("users", "user_id", user_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "User not found" });
        } else {
            return deleteId(Number(user_id)).then(() => {
                return res.status(204).send();
            });
        }
    });
};
