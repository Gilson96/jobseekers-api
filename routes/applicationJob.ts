import express from 'express'
import { createApplicationJob, findAllApplicationJob, uploadCVToApplication } from '../controllers/applicationJob.js'
import { checkAuth } from '../middleware/auth.js'
import multer from 'multer'

const cvUpload = multer({ dest: '../cv_uploads' })
const applicationJobRouter = express.Router()

applicationJobRouter.post('/cv', cvUpload.single('cv'), uploadCVToApplication)

applicationJobRouter.post("/", createApplicationJob)
applicationJobRouter.get("/:job_id", checkAuth, findAllApplicationJob)

export default applicationJobRouter
