import {
    create,
    findAll,
    findId,
    update,
    deleteId,
} from "../models/company.js"
import type { Company } from "../types/index.js";
import { checkIfExists } from "../utils/checkIfExists.js";
import type { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createCompany = (req: Request, res: Response) => {
    const { company_name }: { company_name: string } = req.body;
    const { email }: { email: string } = req.body;
    const { password }: { password: string } = req.body;
    const { number }: { number: string } = req.body;
    const { address }: { address: string } = req.body;

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const saltRounds = 10;

    const requiredFields = [
        "company_name",
        "email",
        "password",
        "number",
        "address",
    ];

    for (let i = 0; i < fields.length; i++) {
        if (fields[i] !== requiredFields[i]) {
            return res.status(400).send({ msg: `invalid ${fields[i]} field` });
        }
        if (typeof values[i] !== 'string') {
            return res.status(400).send({ msg: `invalid ${fields[i]} value` });
        }
    }

    return checkIfExists('company', 'company_name', company_name).then((result) => {
        if (result) {
            return res.status(400).send({ msg: "Company name already exists" })
        } else {
            return bcrypt.hash(password, saltRounds, (err, password) => {
                create({ company_name, email, password, number, address })
                    .then((company) => {
                        return res.status(201).send({
                            company_id: company[0]?.company_id,
                            company_name: company[0]?.company_name,
                            email: company[0]?.email,
                            number: company[0]?.number,
                            address: company[0]?.address,
                        });
                    })
            })
        }
    })
};

export const findAllCompanies = (req: Request, res: Response) => {
    return findAll().then((companies: Company[]) => {
        return res.status(200).send(companies);
    });
};

export const findIdCompany = (req: Request, res: Response) => {
    const company_id = req.params.company_id!
    const field = Object.keys(req.params)[0]!;

    return checkIfExists('company', field, company_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "Company not found" });
        } else {
            return findId(Number(company_id)).then((company: Company[]) => {
                return res.status(200).send({ company: company[0] });
            })
        }
    })
};

export const updateCompany = (req: Request, res: Response) => {
    const company_id = req.params.company_id!;
    const { company_name }: { company_name: string } = req.body;
    const { email }: { email: string } = req.body;
    const { number }: { number: string } = req.body;
    const { address }: { address: string } = req.body;

    const fields = req.body!;
    const fieldToUpdate = Object.keys(fields)!;
    const valueToUpdate = Object.values(fields)!;

    const allowedFields = [
        "company_name",
        "email",
        "number",
        "address",
    ];

    for (let i = 0; i < fieldToUpdate.length; i++) {
        if (!allowedFields.includes(fieldToUpdate[i]!)) {
            return res.status(400).send({ msg: `invalid ${fieldToUpdate[i]} field` });
        }
        if ((valueToUpdate[i] !== undefined && typeof valueToUpdate[i] !== 'string')) {
            return res.status(400).send({ msg: `invalid ${fieldToUpdate[i]} value` });
        }
    }
    return checkIfExists('company', 'company_id', company_id).then(
        (result) => {
            if (!result) {
                return res.status(404).send({ msg: "Company not found" });
            } else {
                return update({ company_name, email, number, address, company_id: Number(company_id) }).then((company) => {
                    return res.status(200).send({ company: company[0] });
                });
            }
        }
    );
};

export const deleteCompany = (req: Request, res: Response) => {
    const company_id = req.params.company_id!;
    const field = Object.keys(req.params)[0]!;

    return checkIfExists('company', field, company_id).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: "Company not found" });
        } else {
            return deleteId(Number(company_id)).then((company) => {
                return res.status(204).send({ company: company[0] });
            });
        }
    });
};
