import express from 'express'
import { createApplication } from '../controllers/application.js'

const applicationRouter = express.Router()

applicationRouter.post("/", createApplication)

export default applicationRouter
