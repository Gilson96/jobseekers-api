import { createCompany, deleteCompany, findIdCompany, updateCompany } from "../controllers/company.js";
import express from 'express'
import { checkAuth } from "../middleware/auth.js";

const companyRouter = express.Router()

companyRouter.post("/", createCompany)
companyRouter.get("/:company_id", findIdCompany)

companyRouter.patch("/:company_id", updateCompany)
companyRouter.delete("/:company_id", deleteCompany)

export default companyRouter
