import express from 'express'
import { createApplication, deleteApplication, findAllApplication, findIdApplication } from '../controllers/application.js'

const applicationRouter = express.Router()

applicationRouter.get("/", findAllApplication)
applicationRouter.get("/:application_id", findIdApplication)
applicationRouter.post("/", createApplication)
applicationRouter.delete("/:application_id", deleteApplication)

export default applicationRouter
