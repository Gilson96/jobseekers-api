import express from 'express'
import { createApplicationUser, findIdApplicationUser } from '../controllers/applicationUser.js'

const applicationUserRouter = express.Router()

applicationUserRouter.get("/:user_id", findIdApplicationUser)
applicationUserRouter.post("/", createApplicationUser)

export default applicationUserRouter
