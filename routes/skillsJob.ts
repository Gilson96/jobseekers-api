import express from 'express'
import { createSkillsJob, findIdSkillsJob } from '../controllers/skillsJob.js'

const skillsJobRouter = express.Router()

skillsJobRouter.get("/:job_id", findIdSkillsJob)
skillsJobRouter.post("/", createSkillsJob)

export default skillsJobRouter
