import express from 'express'
import { createJob, deleteJob, findAllJobs, findJobById, updateJob } from '../controllers/job.js'

const jobRouter = express.Router()

jobRouter.post("/", createJob)
jobRouter.get("/", findAllJobs)
jobRouter.get("/:job_id", findJobById)
jobRouter.patch("/:job_id", updateJob)
jobRouter.delete("/:job_id", deleteJob)

export default jobRouter