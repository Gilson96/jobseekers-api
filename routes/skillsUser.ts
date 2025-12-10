import express from 'express'
import { createSkillsUser, findIdSkillsUser } from '../controllers/skillsUser.js'

const skillsUserRouter = express.Router()

skillsUserRouter.get("/:user_id", findIdSkillsUser)
skillsUserRouter.post("/", createSkillsUser)

export default skillsUserRouter
