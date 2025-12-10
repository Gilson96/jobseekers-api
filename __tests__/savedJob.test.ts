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

describe("GET /api/user/saved_job/:user_id", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .get('/api/user/saved_job/not-valid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when saved_job id not found", () => {
        return request(app)
            .get('/api/user/saved_job/999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("User not found");
            })
    })

    it("should respond with 200 and an object containing all saved job from a user", () => {
        return request(app)
            .get('/api/user/saved_job/1')
            .expect(200)
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

describe("POST /api/user/saved_job", () => {
    it("should responds with a 400 status code when the field is invalid", () => {
        const newSavedJob = {
            person_id: 1,
            job_id: 1
        }
        return request(app)
            .post('/api/user/saved_job')
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
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when skills id not found", () => {
        return request(app)
            .delete('/api/user/saved_job/999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Saved job not found");
            })
    })
    it("should respond with a 204 when skills deleted", () => {
        return request(app).delete('/api/user/saved_job/1').expect(204)
    })

})