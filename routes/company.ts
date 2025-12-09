import { createCompany, deleteCompany, findAllCompanies, findIdCompany, updateCompany } from "../controllers/company.js";
import express from 'express'

const companyRouter = express.Router()

companyRouter.post("/", createCompany)
companyRouter.get("/", findAllCompanies)
companyRouter.get("/:company_id", findIdCompany)
companyRouter.patch("/:company_id", updateCompany)
companyRouter.delete("/:company_id", deleteCompany)

export default companyRouter
