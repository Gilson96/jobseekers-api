import type { Application, Application_job, Application_user, Company, Job, Saved_job, Skills, Skills_job, Skills_user, User } from "../../types/index.js";
import db from "../connection.js";
import { createTables } from "./createTables.js";
import { dropTables } from "./dropTables.js";
import { format } from "node-pg-format"

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
            const formatCompaniesData = companies.map((company) => {
                return [company.company_name];
            });

            const insertIntoCompany = format(
                `INSERT INTO company (company_name) VALUES %L RETURNING*;`,
                formatCompaniesData
            );

            return db.query(insertIntoCompany);
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
        }).then(() => {
            const formatUser = users.map((user) => {
                return [
                    user.name,
                    user.email,
                    user.number,
                    user.address,
                    user.cv,
                ];
            });

            const insertIntoUser = format(
                `INSERT INTO users (name,email,number,address,cv) VALUES %L RETURNING*;`,
                formatUser
            );

            return db.query(insertIntoUser);
        }).then(() => {
            const formatApplications = applications.map((application) => {
                return [application.job_id, application.user_id];
            });
            const insertIntoApplication = format(
                `INSERT INTO application (job_id,user_id) VALUES %L RETURNING*;`,
                formatApplications
            );
            return db.query(insertIntoApplication);
        }).then(() => {
            const formatApplications_user = applications_user.map(
                (application_user) => {
                    return [
                        application_user.application_id,
                        application_user.user_id,
                    ];
                }
            );
            const insertIntoApplication_user = format(
                `INSERT INTO application_user (application_id,user_id) VALUES %L RETURNING*;`,
                formatApplications_user
            );
            return db.query(insertIntoApplication_user);
        }).then(() => {
            const formatApplications_job = applications_job.map(
                (application_job) => {
                    return [application_job.application_id, application_job.job_id];
                }
            );

            const insertIntoApplication_job = format(
                `INSERT INTO application_job (application_id,job_id) VALUES %L RETURNING*;`,
                formatApplications_job
            );
            return db.query(insertIntoApplication_job);
        }).then(() => {
            const formatSkills_user = skills_user.map((skill_user) => {
                return [skill_user.user_id, skill_user.skills_id];
            });

            const insertIntoSkills_person = format(
                `INSERT INTO skills_user (user_id,skills_id) VALUES %L RETURNING*;`,
                formatSkills_user
            );
            return db.query(insertIntoSkills_person);
        }).then(() => {
            const formatSkills_job = skills_job.map((skill_job) => {
                return [skill_job.job_id, skill_job.skills_id];
            });

            const insertIntoSkills_job = format(
                `INSERT INTO skills_job (job_id,skills_id) VALUES %L RETURNING*;`,
                formatSkills_job
            );

            return db.query(insertIntoSkills_job);
        });
    }).then(() => {
        const formatSaved_job = saved_jobs.map((saved_jobs) => {
            return [saved_jobs.user_id, saved_jobs.job_id]
        })

        const insertIntoSaved_job = format(
            `INSERT INTO saved_job(user_id,job_id) VALUES %L RETURNING*;`,
            formatSaved_job
        );

        return db.query(insertIntoSaved_job)
    })
};

