import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { Application_user } from "../types/index.ts";

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

describe("GET /api/user/application_user/:user_id", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .get('/api/user/application_user/not-valid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when application_user id not found", () => {
        return request(app)
            .get('/api/user/application_user/999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("User not found");
            })
    })

    it("should respond with 200 and an object containing a application_user", () => {
        return request(app)
            .get('/api/user/application_user/1')
            .expect(200)
            .then(({ body }) => {
                const { application_user }: { application_user: Application_user } = body;
                expect(application_user).toHaveProperty("application_user_id");
                expect(application_user).toHaveProperty("application_id");
                expect(application_user).toHaveProperty("user_id");
                expect(typeof application_user.application_user_id).toBe("number");
                expect(typeof application_user.application_id).toBe("number");
                expect(typeof application_user.user_id).toBe("number");
            })
    })
})

describe("POST /api/users/application_user", () => {
    it("should responds with a 400 status code when the field is invalid", () => {
        const newApplicationUser = {
            application_id: 1,
            person_id: 1
        }
        return request(app)
            .post('/api/user/application_user')
            .send(newApplicationUser)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid field");
            })
    })
    it("should responds with a 400 satus code when the value is invalid", () => {
        const newapplicationUser = {
            application_id: "1",
            user_id: 1
        }
        return request(app)
            .post('/api/user/application_user')
            .send(newapplicationUser)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid value");
            })
    })

    it("should responds with a 201 status code and an object containing a user application", () => {
        const newapplicationUser = {
            application_id: 1,
            user_id: 1
        }
        return request(app)
            .post('/api/user/application_user')
            .send(newapplicationUser)
            .expect(201)
            .then(({ body }) => {
                const { application_user }: { application_user: Application_user } = body;
                expect(application_user).toHaveProperty("application_user_id");
                expect(application_user).toHaveProperty("application_id");
                expect(application_user).toHaveProperty("user_id");
                expect(typeof application_user.application_user_id).toBe("number");
                expect(typeof application_user.application_id).toBe("number");
                expect(typeof application_user.user_id).toBe("number");
            })
    })
})



