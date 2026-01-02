import type {
    Application, Application_job, Application_user, Company, Job,
    Saved_job, Skills, Skills_job, Skills_user, User
} from "../../types/index.js";
import db from "../connection.js";
import { createTables } from "./createTables.js";
import { dropTables } from "./dropTables.js";
import { format } from "node-pg-format"
import bcrypt from 'bcrypt'

export const seed = ({
    companies,
    jobs,
    users,
    skills,
    applications,
    applications_user,
    applications_job,
    skills_user,
    skills_job,
    saved_jobs
}: {
    companies: Company[],
    jobs: Job[],
    users: User[],
    skills: Skills[],
    applications: Application[],
    applications_user: Application_user[],
    applications_job: Application_job[],
    skills_user: Skills_user[],
    skills_job: Skills_job[],
    saved_jobs: Saved_job[]
}) => {
    return dropTables().then(() => {
        return createTables().then(() => {
            const saltRounds = 10;
            return Promise.all(companies.map((company) => {
                return bcrypt.hash(company.password!, saltRounds).then((password) => {
                    return [
                        company.company_name,
                        company.email,
                        password,
                        company.number,
                        company.address,
                        company.role
                    ];
                })
            })).then((formatCompaniesData) => {
                const insertIntoCompany = format(
                    `INSERT INTO company (company_name,email,password,number,address,role) VALUES %L RETURNING*;`,
                    formatCompaniesData
                );
                return db.query(insertIntoCompany);
            })
        }).then(({ rows }) => {
            const companyIds = rows;

            const formatSkillsData = skills.map((skill) => {
                return [skill.skills_name];
            });

            const insertIntoSkills = format(
                `INSERT INTO skills (skills_name) VALUES %L RETURNING*;`,
                formatSkillsData
            );

            return Promise.all([db.query(insertIntoSkills), companyIds]);
        }).then(([{ rows }, results]) => {
            const formatJobData = jobs.map((job) => {
                const companyId = results.find(
                    (company) => company.company_name === job.company_name
                ).company_id;

                return [
                    job.title,
                    job.location,
                    job.pay,
                    job.type,
                    companyId,
                    job.description,
                ];
            });

            const insertIntoJobs = format(
                `INSERT INTO job (title, location, pay, type, company_id, description) VALUES %L RETURNING*;`,
                formatJobData
            );

            return db.query(insertIntoJobs);
        }).then(({ rows }) => {
            const saltRounds = 10;
            return Promise.all(users.map((user) => {
                return bcrypt.hash(user.password!, saltRounds).then((password) => {
                    return [
                        user.name,
                        user.email,
                        password,
                        user.number,
                        user.address,
                        user.cv,
                        user.role
                    ];
                })

            })).then((formatUser) => {
                const insertIntoUser = format(
                    `INSERT INTO users (name,email,password,number,address,cv,role) VALUES %L RETURNING*;`,
                    formatUser
                )

                return db.query(insertIntoUser);
            })
        })
    })
}
