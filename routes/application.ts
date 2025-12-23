import express from 'express'
import { createApplication } from '../controllers/application.js'
import multer from 'multer'

const cvUpload = multer({ dest: '../cv_uploads' })

const applicationRouter = express.Router()

applicationRouter.post("/", cvUpload.single('cv'), createApplication)

export default applicationRouter
