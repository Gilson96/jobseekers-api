import { checkIfExists } from "../utils/checkIfExists.js"
import type { Request, Response } from "express";
import { findOne as findUser } from "../models/users.js";
import { findOne as findCompany } from "../models/company.js";
import { findLoginUser } from "../utils/findLoginUser.js";

export const login = (req: Request, res: Response) => {
    const { email }: { email: string } = req.body
    const { password }: { password: string } = req.body

    let account_id: number
    let account_email: string
    let account_password: string
    let account_role: string

    return Promise.all([
        checkIfExists('users', 'email', email),
        checkIfExists('company', 'email', email)
    ]).then((result) => {

        if (!result[0] && !result[1]) {
            res.status(404).send({ msg: 'Email not found' })
        } else {

            const user = result[0]
            const company = result[1]

            if (user) {
                findUser(undefined, email).then((user) => {
                    account_id = user[0]?.user_id!
                    account_email = user[0]?.email!
                    account_password = user[0]?.password!
                    account_role = user[0]?.role!

                    findLoginUser(
                        password,
                        account_password,
                        account_email,
                        account_id,
                        account_role,
                        res,
                        req
                    )
                })
            }

            if (company) {
                findCompany(undefined, email).then((company) => {
                    account_id = company[0]?.company_id!
                    account_email = company[0]?.email!
                    account_password = company[0]?.password!
                    account_role = company[0]?.role!

                    findLoginUser(
                        password,
                        account_password,
                        account_email,
                        account_id,
                        account_role,
                        res,
                        req
                    )
                })
            }
        }
    })
}