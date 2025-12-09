export type Company = {
    company_id?: string | number
    company_name?: string
}

export type Skills = {
    skills_id?: number
    skills_name?: string
}

export type Job = {
    job_id?: number | string,
    title?: string,
    location?: string,
    company_name?: string
    pay?: string,
    type?: string,
    company_id?: number,
    description?: string,
}

export type User = {
    user_id?: number | string,
    name?: string,
    avatar_img?: string | null,
    email?: string,
    password?: string,
    number?: string,
    address?: string,
    cv?: string
}

export type Application = {
    application_id?: number,
    job_id?: number,
    user_id?: number
}

export type Skills_user = {
    skills_user_id?: number,
    skills_id?: number
    user_id?: number,
}

export type Skills_job = {
    skills_job_id?: number,
    skills_id?: number
    job_id?: number,
}

export type Application_user = {
    application_user_id?: number,
    application_id?: number,
    user_id?: number
}

export type Application_job = {
    application_job_id?: number,
    application_id?: number,
    job_id?: number
}

export type Saved_job = {
    saved_job_id?: number,
    saved_job_user?: number,
    saved_job_job?: number,
}

export type ErrorHandler = {
    code: string
    status: number,
    msg: string
}