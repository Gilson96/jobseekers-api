import express from 'express'
import { createJob, deleteJob, findAllJobs, findJobById, searchJob, updateJob } from '../controllers/job.js'
import { checkAuth } from '../middleware/auth.js'

const jobRouter = express.Router()

jobRouter.get("/", findAllJobs)
jobRouter.get("/search", searchJob)
jobRouter.get("/:job_id", findJobById)

jobRouter.post("/", checkAuth, createJob)
jobRouter.patch("/:job_id", checkAuth, updateJob)
jobRouter.delete("/:job_id", checkAuth, deleteJob)

export default jobRouter