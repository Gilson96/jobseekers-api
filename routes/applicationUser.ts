import express from 'express'
import { createApplicationUser, findAllApplicationUser } from '../controllers/applicationUser.js'
import { checkAuth } from '../middleware/auth.js'

const applicationUserRouter = express.Router()

applicationUserRouter.post("/", createApplicationUser)
applicationUserRouter.get("/:user_id", checkAuth, findAllApplicationUser)

export default applicationUserRouter
