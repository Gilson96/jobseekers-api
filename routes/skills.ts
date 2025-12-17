import express from 'express'
import { createSkill, deleteSkills, findAllSkills, updateSkills } from '../controllers/skills.js'
import { checkAuth } from '../middleware/auth.js';

const skillsRouter = express.Router()

skillsRouter.get("/", findAllSkills);

skillsRouter.post("/", checkAuth, createSkill)
skillsRouter.patch("/:skills_id", checkAuth, updateSkills)
skillsRouter.delete("/:skills_id", checkAuth, deleteSkills)

export default skillsRouter
