import express from 'express'
import { createUser, deleteUser, findIdUser, updateUser } from "../controllers/users.js";
import { checkAuth } from '../middleware/auth.js';

const usersRouter = express.Router()

usersRouter.post("/", createUser)

usersRouter.get("/:user_id", checkAuth, findIdUser)
usersRouter.patch("/:user_id", checkAuth, updateUser)
usersRouter.delete("/:user_id", checkAuth, deleteUser)


export default usersRouter
