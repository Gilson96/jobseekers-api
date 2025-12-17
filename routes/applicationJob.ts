import express from 'express'
import { createApplicationJob, findAllApplicationJob } from '../controllers/applicationJob.js'
import { checkAuth } from '../middleware/auth.js'

const applicationJobRouter = express.Router()

applicationJobRouter.post("/", createApplicationJob)
applicationJobRouter.get("/:job_id", checkAuth, findAllApplicationJob)

export default applicationJobRouter
