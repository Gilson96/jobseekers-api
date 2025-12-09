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

export const createCompany = (req: Request, res: Response) => {
    const { company_name }: { company_name: string } = req.body;
    const field = Object.keys(req.body)[0]!;

    if (company_name === undefined) {
        return res.status(400).send({ msg: "invalid company field" });
    }

    if (typeof company_name !== "string") {
        return res.status(400).send({ msg: "Must have a string value" });
    }

    return checkIfExists('company', field, company_name).then((result) => {
        if (result) {
            return res.status(400).send({ msg: "Company name already exists" })
        } else {
            return create(company_name).then((company: Company[]) => {
                return res.status(201).send({ company: company[0] })
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
            });
        }
    });
};

export const updateCompany = (req: Request, res: Response) => {
    const company_id = req.params.company_id!;
    const { company_name }: { company_name: string } = req.body;
    const field = Object.keys(req.params)[0]!;

    if (company_name === undefined) {
        return res.status(400).send({ msg: "Invalid field" });
    }

    if (typeof company_name !== "string") {
        return res.status(400).send({ msg: "Invalid value" });
    }

    return checkIfExists('company', field, company_id).then(
        (result) => {
            if (!result) {
                return res.status(404).send({ msg: "Company not found" });
            } else {
                return update(company_name, Number(company_id)).then((company) => {
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
