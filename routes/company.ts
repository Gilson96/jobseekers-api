import { createCompany, deleteCompany, findAllCompanies, findIdCompany, updateCompany } from "../controllers/company.js";
import express from 'express'

const companyRouter = express.Router()

companyRouter.get("/", findAllCompanies)
companyRouter.get("/:company_id", findIdCompany)
companyRouter.post("/", createCompany)
companyRouter.patch("/:company_id", updateCompany)
companyRouter.delete("/:company_id", deleteCompany)

export default companyRouter
