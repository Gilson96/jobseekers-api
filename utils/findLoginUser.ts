import bcrypt from 'bcrypt'
import type { Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const findLoginUser = (
    password: string,
    user_password: string,
    email: string,
    id: number,
    role: string,
    res: Response,
    req: Request
) => {
    bcrypt.compare(password, user_password, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send({ msg: 'Error comparing passowrds:', err })
        } else {
            if (result) {
                const token = jwt.sign(
                    { id, email, role },
                    'c_cret_password',
                    {
                        expiresIn: '1h',
                        algorithm: 'HS256'
                    }
                )
                return res.status(200).send({ id, email, role, token: token })
            } else {
                return res.status(401).send({ msg: "Wrong password" })
            }
        }
    })
}