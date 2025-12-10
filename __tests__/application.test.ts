import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { Application } from "../types/index.ts";

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

describe("GET /api/application", () => {
    it("should respond with 200 and an array with all applications", () => {
        return request(app)
            .get('/api/application')
            .expect(200)
            .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                const application: Application[] = body
                application.forEach((application) => {
                    expect(application).toHaveProperty("application_id");
                    expect(application).toHaveProperty("job_id");
                    expect(application).toHaveProperty("user_id");
                    expect(typeof application.application_id).toBe("number");
                    expect(typeof application.job_id).toBe("number");
                    expect(typeof application.user_id).toBe("number");
                })
            })
    })
})

describe("GET /api/application/:application_id", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .get('/api/application/not-valid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when application id not found", () => {
        return request(app)
            .get('/api/application/999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Application not found");
            })
    })

    it("should respond with 200 and an object containing a application", () => {
        return request(app)
            .get('/api/application/1')
            .expect(200)
            .then(({ body }) => {
                const { application }: { application: Application } = body;
                expect(application).toHaveProperty("application_id");
                expect(application).toHaveProperty("job_id");
                expect(application).toHaveProperty("user_id");
                expect(typeof application.application_id).toBe("number");
                expect(typeof application.job_id).toBe("number");
                expect(typeof application.user_id).toBe("number");
            })
    })
})

describe("POST /api/application", () => {
    it("should responds with a 400 satus code when the field is invalid", () => {
        const newApplication = {
            job_id: 1,
            person_id: 1
        }
        return request(app)
            .post('/api/application')
            .send(newApplication)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid field");
            })
    })
    it("should responds with a 400 satus code when the value is invalid", () => {
        const newapplication = {
            job_id: "1",
            user_id: 1
        }
        return request(app)
            .post('/api/application')
            .send(newapplication)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid value");
            })
    })

    it("should responds with a 201 status code and an object containing a application", () => {
        const newapplication = {
            job_id: 1,
            user_id: 1
        }
        return request(app)
            .post('/api/application')
            .send(newapplication)
            .expect(201)
            .then(({ body }) => {
                const { application }: { application: Application } = body;
                expect(application).toHaveProperty("application_id");
                expect(application).toHaveProperty("job_id");
                expect(application).toHaveProperty("user_id");
                expect(typeof application.application_id).toBe("number");
                expect(typeof application.job_id).toBe("number");
                expect(typeof application.user_id).toBe("number");
            })
    })
})

describe("DELETE /api/application", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .delete('/api/application/not-valid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when application id not found", () => {
        return request(app)
            .delete('/api/application/999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("application not found");
            })
    })
    it("should respond with a 204 when application deleted", () => {
        return request(app).delete('/api/application/1').expect(204)
    })

})



