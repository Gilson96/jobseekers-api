import express from 'express'
import { createSkillsJob } from '../controllers/skillsJob.js'

const skillsJobRouter = express.Router()

skillsJobRouter.post("/", createSkillsJob)

export default skillsJobRouter
