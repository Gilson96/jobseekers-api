import { findOne } from "../models/users.js"
import { checkIfExists } from "../utils/checkIfExists.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import type { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    const { email }: { email: string } = req.body
    const { password }: { password: string } = req.body

    return Promise.all([
        checkIfExists('users', 'email', email),
        checkIfExists('company', 'email', email)
    ]).then((result) => {
        if (!result[0] && !result[1]) {
            return res.status(404).send({ msg: 'Email not found' })
        } else {
            findOne(undefined, email).then((user) => {
                const user_password = user[0]?.password!
                const user_id = user[0]?.user_id!
                const user_role = user[0]?.role!

                bcrypt.compare(password, user_password, (err, result) => {
                    if (err) {
                        return res.status(400).send({ msg: 'Error comparing passowrds:', err })
                    } else {
                        if (result) {
                            const token = jwt.sign(
                                { user_id: user_id, email: email, role: user_role },
                                'c_cret_password',
                                {
                                    expiresIn: '1h',
                                    algorithm: 'HS256'

                                }
                            )
                            return res.status(200).send({
                                user_id: user[0]?.user_id,
                                email: user[0]?.email,
                                role: user[0]?.role,
                                token: token
                            })
                        } else {
                            return res.status(401).send({ msg: "Wrong password" })
                        }
                    }
                })
            })
        }
    })
}