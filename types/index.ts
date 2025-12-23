import type { IncomingHttpHeaders } from "http"
import type { JwtPayload } from "jsonwebtoken"
import { type Request } from "express"

export type Company = {
    company_id?: number
    company_name?: string,
    email?: string,
    password?: string,
    number?: string,
    address?: string,
    role?: string,
    jobs_posted?: [
        {
            title: string,
            job_id: number,
            location: string
        }
    ]
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
    description?: {
        about_us: string,
        job_details: string,
        requirements: string,
        shift_pattern: string
    },
    skills?: [{ skills_name: string }]
}

export type User = {
    user_id?: number
    name?: string,
    avatar_img?: string | null,
    email?: string,
    password?: string,
    number?: string,
    address?: string,
    cv?: string
    role?: string
}

export type Application = {
    application_id?: number,
    job_id?: number,
    user_id?: number
    cv?: string
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
    job_id?: number | string,
    user_id?: number
    title?: string,
    location?: string,
    company_name?: string
}

export type Application_job = {
    application_job_id?: number,
    application_id?: number,
    job_id?: number
    user_id?: number
    name?: string,
    email?: string,
    number?: string,
    address?: string,
    cv?: string
}

export type Saved_job = {
    saved_job_id?: number,
    user_id?: number,
    job_id?: number,
    saved_jobs?: [{
        title: string,
        job_id: number,
        location: string,
        company_name: string
    }]
}

export type ErrorHandler = {
    code: string
    status: number,
    msg: string
}

export interface AuthRequest extends Request {
    user?: {
        user_id: number
        email: string,
        role: string,
    } | JwtPayload
}
