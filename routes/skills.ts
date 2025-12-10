import express from 'express'
import { createSkill, deleteSkills, findAllSkills, findIdskills, updateSkills } from '../controllers/skills.js'

const skillsRouter = express.Router()

skillsRouter.get("/", findAllSkills);
skillsRouter.get("/:skills_id", findIdskills);
skillsRouter.post("/", createSkill)
skillsRouter.patch("/:skills_id", updateSkills)
skillsRouter.delete("/:skills_id", deleteSkills)

export default skillsRouter

