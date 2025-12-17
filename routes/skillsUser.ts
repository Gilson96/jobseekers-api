import express from 'express'
import { createSkillsUser } from '../controllers/skillsUser.js'

const skillsUserRouter = express.Router()

skillsUserRouter.post("/", createSkillsUser)

export default skillsUserRouter
