import express from 'express'
import { createJob, deleteJob, findAllJobs, findJobById, searchJob, updateJob } from '../controllers/job.js'

const jobRouter = express.Router()

jobRouter.get("/", findAllJobs)
jobRouter.get("/search", searchJob)
jobRouter.get("/:job_id", findJobById)

jobRouter.post("/", createJob)
jobRouter.patch("/:job_id", updateJob)
jobRouter.delete("/:job_id", deleteJob)

export default jobRouter