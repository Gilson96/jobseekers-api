import { createCompany } from "../controllers/company.js";
import express from 'express'

const companyRouter = express.Router()

companyRouter.post("/", createCompany)

export default companyRouter
