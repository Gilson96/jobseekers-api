import { createCompany, deleteCompany, findIdCompany, updateCompany } from "../controllers/company.js";
import express from 'express'
import { checkAuth } from "../middleware/auth.js";

const companyRouter = express.Router()

companyRouter.post("/", createCompany)

companyRouter.get("/:company_id", checkAuth, findIdCompany)
companyRouter.patch("/:company_id", checkAuth, updateCompany)
companyRouter.delete("/:company_id", checkAuth, deleteCompany)

export default companyRouter