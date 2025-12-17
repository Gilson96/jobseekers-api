import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { Saved_job } from "../types/index.js";

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

describe("GET /api/user/saved_job/:user_id", () => {
    it("should respond with 400 when invalid params", () => {
        const login = {
            email: "user@user.com",
            password: "user123",
        }
        return request(app)
            .post('/api/login')
            .send(login)
            .expect(200)
            .then((body) => {
                token = body.body.token
            }).then(() => {
                return request(app)
                    .get('/api/user/saved_job/not-valid')
                    .auth(token, { type: 'bearer' })
                    .expect(400)
                    .then(({ body }) => {
                        expect(body.msg).toBe("Invalid params");
                    })
            })
    })
    it("should respond with 404 when saved_job id not found", () => {
        return request(app)
            .get('/api/user/saved_job/999')
            .auth(token, { type: 'bearer' })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("User not found");
            })
    })
    it("should respond with 200 and an object containing all saved job from a user", () => {
        return request(app)
            .get('/api/user/saved_job/1')
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                const saved_job: Saved_job[] = body;
                saved_job.forEach(saved => {
                    expect(saved).toHaveProperty("saved_job_id");
                    expect(saved).toHaveProperty("saved_jobs");
                    expect(saved).toHaveProperty("saved_jobs");
                    expect(saved).toHaveProperty("saved_jobs[0].title");
                    expect(saved).toHaveProperty("saved_jobs[0].job_id");
                    expect(saved).toHaveProperty("saved_jobs[0].location");
                    expect(saved).toHaveProperty("saved_jobs[0].company_name");
                    expect(typeof saved.saved_job_id).toBe("number");
                    expect(typeof saved.saved_jobs).toBe("object");
                    expect(typeof saved.saved_jobs?.[0].title).toBe("string");
                    expect(typeof saved.saved_jobs?.[0].job_id).toBe("number");
                    expect(typeof saved.saved_jobs?.[0].location).toBe("string");
                    expect(typeof saved.saved_jobs?.[0].company_name).toBe("string");
                })

            })
    })
})

describe("POST /api/user/saved_job", () => {
    it("should responds with a 400 status code when the field is invalid", () => {
        const newSavedJob = {
            person_id: 1,
            job_id: 1
        }
        return request(app)
            .post('/api/user/saved_job')
            .auth(token, { type: 'bearer' })
            .send(newSavedJob)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid field");
            })
    })
    it("should responds with a 400 satus code when the value is invalid", () => {
        const newSavedJob = {
            user_id: "1",
            job_id: 1
        }
        return request(app)
            .post('/api/user/saved_job')
            .auth(token, { type: 'bearer' })
            .send(newSavedJob)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid value");
            })
    })
    it("should responds with a 201 status code and an object containing a saved job", () => {
        const newSavedJob = {
            user_id: 1,
            job_id: 1
        }
        return request(app)
            .post('/api/user/saved_job')
            .auth(token, { type: 'bearer' })
            .send(newSavedJob)
            .expect(201)
            .then(({ body }) => {
                const { saved_job }: { saved_job: Saved_job } = body;
                expect(saved_job).toHaveProperty("saved_job_id");
                expect(saved_job).toHaveProperty("user_id");
                expect(saved_job).toHaveProperty("job_id");
                expect(typeof saved_job.saved_job_id).toBe("number");
                expect(typeof saved_job.user_id).toBe("number");
                expect(typeof saved_job.job_id).toBe("number");
            })
    })
})

describe("DELETE /api/user/saved_job/:saved_job_id", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .delete('/api/user/saved_job/not-valid')
            .auth(token, { type: 'bearer' })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when skills id not found", () => {
        return request(app)
            .delete('/api/user/saved_job/999')
            .auth(token, { type: 'bearer' })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Saved job not found");
            })
    })
    it("should respond with a 204 when skills deleted", () => {
        return request(app).delete('/api/user/saved_job/1').auth(token, { type: 'bearer' }).expect(204)
    })

})