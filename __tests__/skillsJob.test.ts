import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { Skills_job } from "../types/index.ts";

beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    return db.end();
});

let token: string

describe("checks if attempting to access a non-existent endpoint", () => {
    it("should respond with a 404 status code for invalid endpoint", () => {
        return request(app).get("/api/not-valid").expect(404)
    });
});


describe("POST /api/job/skills_job", () => {
    it("should responds with a 400 status code when the field is invalid", () => {
        const newskillsjob = {
            skills_id: 1,
            work_id: 1
        }
        return request(app)
            .post('/api/job/skills_job')
            .send(newskillsjob)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid field");
            })
    })
    it("should responds with a 400 satus code when the value is invalid", () => {
        const newskillsjob = {
            skills_id: "1",
            job_id: 1
        }
        return request(app)
            .post('/api/job/skills_job')
            .send(newskillsjob)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid value");
            })
    })

    it("should responds with a 201 status code and an object containing a job skills", () => {
        const newskillsjob = {
            skills_id: 1,
            job_id: 1
        }
        return request(app)
            .post('/api/job/skills_job')
            .send(newskillsjob)
            .expect(201)
            .then(({ body }) => {
                const { skills_job }: { skills_job: Skills_job } = body;
                expect(skills_job).toHaveProperty("skills_job_id");
                expect(skills_job).toHaveProperty("skills_id");
                expect(skills_job).toHaveProperty("job_id");
                expect(typeof skills_job.skills_job_id).toBe("number");
                expect(typeof skills_job.skills_id).toBe("number");
                expect(typeof skills_job.job_id).toBe("number");
            })
    })
})

describe.only("DELETE /api/job/skills_job", () => {
    it("should responds with a 204 status code and an object containing a job skills", () => {
        const newskillsJob = {
            skills_id: 1,
            job_id: 1
        }
        const login = {
            email: "talentbridge@company.com",
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
                    .delete('/api/job/skills_job/1')
                    .auth(token, { type: 'bearer' })
                    .send(newskillsJob)
                    .expect(204)
                    .then(() => { })
            })
    })
})