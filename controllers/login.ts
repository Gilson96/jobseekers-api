import { findOne } from "../models/users.js"
import { checkIfExists } from "../utils/checkIfExists.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import type { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    const { email }: { email: string } = req.body
    const { password }: { password: string } = req.body

    return checkIfExists('users', 'email', email).then((result) => {
        if (!result) {
            return res.status(404).send({ msg: 'User email not found' })
        } else {
            findOne(undefined, email).then((user) => {
                const userPassword = user[0]?.password!
                const user_id = user[0]?.user_id!

                bcrypt.compare(password, userPassword, (err, result) => {
                    if (err) {
                        console.log('Error comparing passowrds:', err)
                    } else {
                        if (result) {
                            const token = jwt.sign(
                                { user_id: user_id, email: email },
                                'c_cret_password',
                                {
                                    expiresIn: '1h',
                                    algorithm: 'HS256'
                                }
                            )
                            return res.status(200).send({
                                user_id: user[0]?.user_id,
                                email: user[0]?.email,
                                token: token
                            })
                        } else {
                            return res.status(401).send({ msg: "Incorrect password" })
                        }
                    }
                })
            })
        }
    })
}