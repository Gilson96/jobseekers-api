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
    const { company_name } = req.body;
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

// exports.findAllCompanies = (req, res) => {
//     return findAll().then((companies) => {
//         return res.status(200).send(companies);
//     });
// };

// exports.findIdCompany = (req, res) => {
//     const company_id = req.params.company_id;
//     const field = Object.keys(req.params)[0];

//     return checkIfCompanyExists(field, company_id).then((result) => {
//         if (!result) {
//             return res.status(404).send({ msg: "Company does not exists" });
//         } else {
//             return findId(company_id).then((company) => {
//                 return res.status(200).send({ company: company[0] });
//             });
//         }
//     });
// };

// exports.updateCompany = (req, res) => {
//     const company_id = req.params.company_id;
//     const { company_name } = req.body;
//     const fieldToCheckIfCompanyExists = Object.keys(req.params)[0];

//     if (company_name === undefined) {
//         return res.status(400).send({ msg: "invalid company field" });
//     }

//     if (typeof company_name !== "string") {
//         return res.status(400).send({ msg: "Invalid value" });
//     }

//     return checkIfCompanyExists(fieldToCheckIfCompanyExists, company_id).then(
//         (result) => {
//             if (!result) {
//                 return res.status(404).send({ msg: "Company does not exists" });
//             } else {
//                 return update(company_name, company_id).then((company) => {
//                     return res.status(200).send({ company: company[0] });
//                 });
//             }
//         }
//     );
// };

// exports.deleteCompany = (req, res) => {
//     const company_id = req.params.company_id;
//     const field = Object.keys(req.params)[0];

//     if (company_id === undefined) {
//         return res.status(400).send({ msg: "Invalid company Id" });
//     }

//     return checkIfCompanyExists(field, company_id).then((result) => {
//         if (!result) {
//             return res.status(404).send({ msg: "Company does not exists" });
//         } else {
//             return deleteId(company_id).then((company) => {
//                 return res.status(204).send({ company: company[0] });
//             });
//         }
//     });
// };
