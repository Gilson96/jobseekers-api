import express from 'express'
import { createSkillsUser, deleteSkillsUser } from '../controllers/skillsUser.js'
import { checkAuth } from '../middleware/auth.js'

const skillsUserRouter = express.Router()

skillsUserRouter.post("/", checkAuth, createSkillsUser)
skillsUserRouter.delete("/:skills_user_id", checkAuth, deleteSkillsUser)

export default skillsUserRouter
