import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { Application_job } from "../types/index.ts";

beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    return db.end();
});

describe("checks if attempting to access a non-existent endpoint", () => {
    it("should respond with a 404 status code for invalid endpoint", () => {
        return request(app).get("/api/not-valid").expect(404)
    });
});

let token: string

describe("GET /api/job/application_job/:job_id", () => {
    it("should respond with 400 when invalid params", () => {
        const login = {
            email: "vertextalent@company.com",
            password: "company123",
        }
        return request(app)
            .post('/api/login')
            .send(login)
            .expect(200)
            .then((body) => {
                token = body.body.token
            }).then(() => {
                return request(app)
                    .get('/api/job/application_job/not-valid')
                    .auth(token, { type: "bearer" })
                    .expect(400)
                    .then(({ body }) => {
                        expect(body.msg).toBe("Invalid params");
                    })
            })
    })
    it("should respond with 404 when application_job id not found", () => {
        return request(app)
            .get('/api/job/application_job/999')
            .auth(token, { type: 'bearer' })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Application not found");
            })
    })
    it("should respond with 200 and an object containing a application_job", () => {
        return request(app)
            .get('/api/job/application_job/2')
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                const application_job: Application_job[] = body;
                console.log(application_job)
                application_job.forEach(app_job => {
                    expect(app_job).toHaveProperty("application_job_id");
                    expect(app_job).toHaveProperty("application_id");
                    expect(app_job).toHaveProperty("job_id");
                    expect(app_job).toHaveProperty("user_id");
                    expect(app_job).toHaveProperty("name");
                    expect(app_job).toHaveProperty("email");
                    expect(app_job).toHaveProperty("number");
                    expect(app_job).toHaveProperty("address");
                    expect(app_job).toHaveProperty("cv");
                    expect(typeof app_job.application_job_id).toBe("number");
                    expect(typeof app_job.application_id).toBe("number");
                    expect(typeof app_job.job_id).toBe("number");
                    expect(typeof app_job.user_id).toBe("number");
                    expect(typeof app_job.email).toBe("string");
                    expect(typeof app_job.number).toBe("string");
                    expect(typeof app_job.address).toBe("string");
                    expect(typeof app_job.cv).toBe("string");
                })

            })
    })
})

describe("POST /api/jobs/application_job", () => {
    it("should responds with a 400 status code when the field is invalid", () => {
        const newApplicationJob = {
            application_id: 1,
            work_id: 1
        }
        return request(app)
            .post('/api/job/application_job')
            .send(newApplicationJob)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid field");
            })
    })
    it("should responds with a 400 satus code when the value is invalid", () => {
        const newApplicationJob = {
            application_id: "1",
            job_id: 1
        }
        return request(app)
            .post('/api/job/application_job')
            .send(newApplicationJob)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid value");
            })
    })

    it.only("should responds with a 201 status code and an object containing a job application", () => {
        const newApplicationJob = {
            application_id: 1,
            job_id: 1,
            guest_name: 'Fi'
        }
        const newapplication = {
            job_id: 1,
            user_id: 1,
        }
        return request(app)
            .post('/api/application')
            .send(newapplication)
            .expect(201)
            .then(({ body }) => {
                return request(app)
                    .post('/api/job/application_job')
                    .send(newApplicationJob)
                    .expect(201)
                    .then(({ body }) => {
                        const { application_job }: { application_job: Application_job } = body;
                        console.log(application_job)
                        expect(application_job).toHaveProperty("application_job_id");
                        expect(application_job).toHaveProperty("application_id");
                        expect(application_job).toHaveProperty("job_id");
                        expect(typeof application_job.application_job_id).toBe("number");
                        expect(typeof application_job.application_id).toBe("number");
                        expect(typeof application_job.job_id).toBe("number");
                    })
            })

    })
})