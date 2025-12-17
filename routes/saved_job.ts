import express from 'express'
import { createSavedJob, deleteSavedJob, findAllSavedJob } from '../controllers/saved_job.js'
import { checkAuth } from '../middleware/auth.js'

const savedJobRouter = express.Router()

savedJobRouter.post("/", checkAuth, createSavedJob)
savedJobRouter.get("/:user_id", checkAuth, findAllSavedJob)
savedJobRouter.delete("/:saved_job_id", checkAuth, deleteSavedJob)

export default savedJobRouter
