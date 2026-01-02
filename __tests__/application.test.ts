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
    it.only("should responds with a 201 status code and an object containing a application", () => {
    
        const newapplication = {
            job_id: 1,
            user_id: 1,
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




