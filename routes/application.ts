import express from 'express'
import { createApplication } from '../controllers/application.js'
import multer from 'multer'


const applicationRouter = express.Router()

applicationRouter.post("/",  createApplication)

export default applicationRouter
