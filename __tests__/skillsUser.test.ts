import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { Skills_user } from "../types/index.ts";

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

describe("POST /api/user/skills_user", () => {
    it("should responds with a 400 status code when the field is invalid", () => {
        const newskillsuser = {
            skills_id: 1,
            person_id: 1
        }
        return request(app)
            .post('/api/user/skills_user')
            .send(newskillsuser)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid field");
            })
    })
    it("should responds with a 400 satus code when the value is invalid", () => {
        const newskillsuser = {
            skills_id: "1",
            user_id: 1
        }
        return request(app)
            .post('/api/user/skills_user')
            .send(newskillsuser)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid value");
            })
    })
    it("should responds with a 201 status code and an object containing a user skills", () => {
        const newskillsuser = {
            skills_id: 1,
            user_id: 1
        }
        return request(app)
            .post('/api/user/skills_user')
            .send(newskillsuser)
            .expect(201)
            .then(({ body }) => {
                const { skills_user }: { skills_user: Skills_user } = body;
                expect(skills_user).toHaveProperty("skills_user_id");
                expect(skills_user).toHaveProperty("skills_id");
                expect(skills_user).toHaveProperty("user_id");
                expect(typeof skills_user.skills_user_id).toBe("number");
                expect(typeof skills_user.skills_id).toBe("number");
                expect(typeof skills_user.user_id).toBe("number");
            })
    })
})

describe.only("DELETE /api/user/skills_user", () => {
    it("should responds with a 204 status code and an object containing a user skills", () => {
        const newskillsuser = {
            skills_id: 1,
            user_id: 1
        }
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
                    .delete('/api/user/skills_user/1')
                    .auth(token, { type: 'bearer' })
                    .send(newskillsuser)
                    .expect(204)
                    .then(() => { })
            })
    })
})