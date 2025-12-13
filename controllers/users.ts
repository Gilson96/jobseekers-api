import type { Request, Response } from "express";
import { create, update, deleteId, findOne } from "../models/users.js"
import { checkIfExists } from "../utils/checkIfExists.js"
import bcrypt from 'bcrypt'

export const createUser = (req: Request, res: Response) => {
    const { name }: { name: string } = req.body;
    const { email }: { email: string } = req.body;
    const { password }: { password: string } = req.body;
    const { number }: { number: string } = req.body;
    const { address }: { address: string } = req.body;
    const { cv }: { cv: string } = req.body;

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const saltRounds = 10;

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
            return bcrypt.hash(password, saltRounds, (err, password) => {
                create({ name, email, password, number, address, cv })
                    .then((user) => {
                        return res.status(201).send({
                            user_id: user[0]?.user_id,
                            name: user[0]?.name,
                            email: user[0]?.email,
                            number: user[0]?.number,
                            address: user[0]?.address,
                            cv: user[0]?.cv,
                        });
                    });
            })
        }
    });
};

export const findIdUser = (req: Request, res: Response) => {
    const user_id = req.params.user_id!;
    const field = Object.keys(req.params)[0]!;
    console.log(req)
    return checkIfExists("users", field, user_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "User not found" });
        } else {
            return findOne(Number(user_id)).then((user) => {
                return res.status(200).send({ user: user[0] });
            });
        }
    });
};

export const updateUser = (req: Request, res: Response) => {
    const user_id = req.params.user_id!
    const { name }: { name: string } = req.body!;
    const { email }: { email: string } = req.body!;
    const { number }: { number: string } = req.body!;
    const { address }: { address: string } = req.body!;
    const { cv }: { cv: string } = req.body!;

    const fields = req.body!;
    const fieldToUpdate = Object.keys(fields)!;
    const valueToUpdate = Object.values(fields)!;

    const allowedFields = [
        "name",
        "email",
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
            return update({ name, email, number, address, cv, user_id: Number(user_id) })
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

