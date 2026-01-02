import express from 'express'
import { createSkillsJob, deleteSkillsJob } from '../controllers/skillsJob.js'
import { checkAuth } from '../middleware/auth.js'

const skillsJobRouter = express.Router()

skillsJobRouter.post("/", createSkillsJob)
skillsJobRouter.delete("/:skills_job_id", checkAuth, deleteSkillsJob)

export default skillsJobRouter
