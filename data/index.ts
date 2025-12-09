import { applications } from "../data/applications.js"
import { applications_job } from "../data/applications_job.js"
import { applications_user } from "../data/applications_user.js"
import { companies } from "../data/companies.js"
import { jobs } from "../data/jobs.js"
import { saved_jobs } from "../data/saved_job.js"
import { skills } from "../data/skills.js"
import { skills_job } from "../data/skills_job.js"
import { skills_user } from "../data/skills_user.js"
import { users } from "../data/users.js"
import type { Application, Application_job, Application_user, Company, Job, Saved_job, Skills, Skills_job, Skills_user, User } from "../types/index.js"

export const data: {
    companies: Company[],
    jobs: Job[],
    applications: Application[],
    applications_job: Application_job[],
    applications_user: Application_user[],
    saved_jobs: Saved_job[],
    skills: Skills[],
    skills_job: Skills_job[],
    skills_user: Skills_user[],
    users: User[]
} = {
    companies,
    jobs,
    applications,
    applications_job,
    applications_user,
    saved_jobs,
    skills,
    skills_job,
    skills_user,
    users
};