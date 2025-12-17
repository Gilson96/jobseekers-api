import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { Skills } from "../types/index.js";

beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    return db.end();
});

let token: string

describe("checks if attempting to access a non-existent endpoint", () => {
    it("should respond with a 404 status code for invalid endpoint", () => {
        return request(app).get("/api/invalid-endpoint").expect(404);
    });
});

describe("GET /api/skills", () => {
    it("should respond with a 200 status code and an array containing all skills", () => {
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
                    .get("/api/skills")
                    .auth(token, { type: 'bearer' })
                    .expect(200)
                    .then(({ body }) => {
                        expect(Array.isArray(body)).toBe(true);
                        body.forEach((skills: Skills) => {
                            expect(skills).toHaveProperty("skills_id");
                            expect(skills).toHaveProperty("skills_name");
                            expect(typeof skills).toBe("object");
                            expect(typeof skills.skills_id).toBe("number");
                            expect(typeof skills.skills_name).toBe("string");
                        });
                    });
            })
    });
});

describe("POST /api/skills", () => {
    it("should responds with a 400 satus code when the field is invalid", () => {
        const newSkils = {
            company_title: 'new skills'
        }
        return request(app)
            .post('/api/skills')
            .auth(token, { type: 'bearer' })
            .send(newSkils)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid field");
            })
    })
    it("should responds with a 400 satus code when the value is invalid", () => {
        const newSkils = {
            skills_name: 3
        }
        return request(app)
            .post('/api/skills')
            .auth(token, { type: 'bearer' })
            .send(newSkils)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid value");
            })
    })

    it("should responds with a 201 status code and an object containing a skill", () => {
        const newSkils = {
            skills_name: 'new company'
        }
        return request(app)
            .post('/api/skills')
            .auth(token, { type: 'bearer' })
            .send(newSkils)
            .expect(201)
            .then(({ body }) => {
                const { skills }: { skills: Skills } = body;
                expect(skills).toHaveProperty("skills_name");
                expect(typeof skills.skills_name).toBe("string");
            })
    })
})

describe("PATCH /api/skills/:skills_id", () => {
    it("should respond with 400 when invalid params", () => {
        const updatedSkills = {
            skills_name: "new title"
        }
        return request(app)
            .patch('/api/skills/not-valid')
            .auth(token, { type: 'bearer' })
            .send(updatedSkills)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with a 400 when invalid field", () => {
        const updatedSkills = {
            skills_title: "new title"
        }
        return request(app)
            .patch('/api/skills/1')
            .auth(token, { type: 'bearer' })
            .send(updatedSkills)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid field");
            })
    })
    it("should respond with a 400 when invalid value", () => {
        const updatedSkills = {
            skills_name: 2
        }
        return request(app)
            .patch('/api/skills/1')
            .auth(token, { type: 'bearer' })
            .send(updatedSkills)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid value");
            })
    })
    it("should respond with a 404 when skills_id not found", () => {
        const updatedSkills = {
            skills_name: "new title"
        }
        return request(app)
            .patch('/api/skills/999')
            .auth(token, { type: 'bearer' })
            .send(updatedSkills)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Skill not found");
            })
    })
    it("should respond with a 200 with an object containing the updated skills", () => {
        const updatedSkills = {
            skills_name: "new title"
        }
        return request(app)
            .patch('/api/skills/1')
            .auth(token, { type: 'bearer' })
            .send(updatedSkills)
            .expect(200)
            .then(({ body }) => {
                const { skills }: { skills: Skills } = body;
                expect(skills).toHaveProperty("skills_name");
                expect(typeof skills.skills_name).toBe("string");
            })
    })
})

describe("DELETE /api/skills", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .delete('/api/skills/not-valid')
            .auth(token, { type: 'bearer' })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when skills id not found", () => {
        return request(app)
            .delete('/api/skills/999')
            .auth(token, { type: 'bearer' })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("skills not found");
            })
    })
    it("should respond with a 204 when skills deleted", () => {
        return request(app).delete('/api/skills/1').auth(token, { type: 'bearer' }).expect(204)
    })

})