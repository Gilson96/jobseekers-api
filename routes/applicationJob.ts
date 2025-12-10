import express from 'express'
import { createApplicationJob, findIdApplicationJob } from '../controllers/applicationJob.js'

const applicationJobRouter = express.Router()

applicationJobRouter.get("/:job_id", findIdApplicationJob)
applicationJobRouter.post("/", createApplicationJob)

export default applicationJobRouter
