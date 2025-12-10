import express from 'express'
import { createUser, deleteUser, findIdUser, updateUser } from "../controllers/users.js";

const usersRouter = express.Router()

usersRouter.get("/:user_id", findIdUser)
usersRouter.post("/", createUser)
usersRouter.patch("/:user_id", updateUser)
usersRouter.delete("/:user_id", deleteUser)

export default usersRouter
