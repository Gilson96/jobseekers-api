import express from 'express'
import { createSavedJob, deleteSavedJob, findAllSavedJob } from '../controllers/saved_job.js'

const savedJobRouter = express.Router()

savedJobRouter.post("/", createSavedJob)
savedJobRouter.get("/:user_id", findAllSavedJob)
savedJobRouter.delete("/:saved_job_id", deleteSavedJob)

export default savedJobRouter
