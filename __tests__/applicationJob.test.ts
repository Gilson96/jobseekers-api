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

describe("GET /api/job/application_job/:job_id", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .get('/api/job/application_job/not-valid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when application_job id not found", () => {
        return request(app)
            .get('/api/job/application_job/999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Job not found");
            })
    })

    it("should respond with 200 and an object containing a application_job", () => {
        return request(app)
            .get('/api/job/application_job/1')
            .expect(200)
            .then(({ body }) => {
                const { application_job }: { application_job: Application_job } = body;
                expect(application_job).toHaveProperty("application_job_id");
                expect(application_job).toHaveProperty("application_id");
                expect(application_job).toHaveProperty("job_id");
                expect(typeof application_job.application_job_id).toBe("number");
                expect(typeof application_job.application_id).toBe("number");
                expect(typeof application_job.job_id).toBe("number");
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

    it("should responds with a 201 status code and an object containing a job application", () => {
        const newApplicationJob = {
            application_id: 1,
            job_id: 1
        }
        return request(app)
            .post('/api/job/application_job')
            .send(newApplicationJob)
            .expect(201)
            .then(({ body }) => {
                const { application_job }: { application_job: Application_job } = body;
                expect(application_job).toHaveProperty("application_job_id");
                expect(application_job).toHaveProperty("application_id");
                expect(application_job).toHaveProperty("job_id");
                expect(typeof application_job.application_job_id).toBe("number");
                expect(typeof application_job.application_id).toBe("number");
                expect(typeof application_job.job_id).toBe("number");
            })
    })
})