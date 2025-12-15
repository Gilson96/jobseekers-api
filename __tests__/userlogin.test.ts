import { afterAll, describe, it, expect, beforeAll } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { User } from "../types/index.js";

beforeAll(() => {
    return seed(data)
});

afterAll(() => {
    return db.end();
});

let token: string

describe("GET /api/users/:user_id", () => {
    it("should respond with 404 when email not found", () => {
        const login = {
            email: "us@user.com",
            password: "user123",
        }
        return request(app)
            .post('/api/login')
            .send(login)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Email not found");
            })
    })
    it("should respond with 400 when wrong password", () => {
        const login = {
            email: "user@user.com",
            password: "user12",
        }
        return request(app)
            .post('/api/login')
            .send(login)
            .expect(401)
            .then(({ body }) => {
                expect(body.msg).toBe("Wrong password");
            })
    })
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
                    .get('/api/user/not-valid')
                    .auth(token, { type: 'bearer' })
                    .expect(400).then(({ body }) => {
                        expect(body.msg).toBe("Invalid params");
                    })
            })
    })
    it("should respond with 404 when user id not found", () => {
        return request(app)
            .get('/api/user/999')
            .auth(token, { type: 'bearer' })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("User not found");
            })
    })
    it("should respond with 200 and an object containing a user", () => {
        return request(app)
            .get('/api/user/1')
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(({ body }) => {
                const { user }: { user: User } = body;
                expect(user).toHaveProperty("user_id");
                expect(user).toHaveProperty("name");
                expect(user).toHaveProperty("email");
                expect(user).toHaveProperty("password");
                expect(user).toHaveProperty("number");
                expect(user).toHaveProperty("address");
                expect(user).toHaveProperty("cv");
                expect(typeof user).toBe("object");
                expect(typeof user.user_id).toBe("number");
                expect(typeof user.name).toBe("string");
                expect(typeof user.email).toBe("string");
                expect(typeof user.password).toBe("string");
                expect(typeof user.number).toBe("string");
                expect(typeof user.address).toBe("string");
                expect(typeof user.cv).toBe("string");
            })
    })
})

describe("PATCH /api/user/:user_id", () => {
    it("should respond with 400 when invalid params", () => {
        const updatedUser = {
            name: 'Gilson',
            address: 'address',
        }
        return request(app)
            .patch('/api/user/not-valid')
            .auth(token, { type: 'bearer' })
            .send(updatedUser)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with a 400 when invalid field", () => {
        const updatedUser = {
            title: 'Gilson',
            address: 'address',
        }
        return request(app)
            .patch('/api/user/1')
            .auth(token, { type: 'bearer' })
            .send(updatedUser)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe(body.msg);
            })
    })
    it("should respond with a 400 when invalid value", () => {
        const updatedUser = {
            name: 3,
            address: 'address'
        }
        return request(app)
            .patch('/api/user/1')
            .auth(token, { type: 'bearer' })
            .send(updatedUser)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe(body.msg);
            })
    })
    it("should respond with a 404 when user_id not found", () => {
        const updatedUser = {
            address: "new title"
        }
        return request(app)
            .patch('/api/user/999')
            .auth(token, { type: 'bearer' })
            .send(updatedUser)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("User not found");
            })
    })
    it("should respond with a 200 with an object containing the updated user", () => {
        const updatedUser = {
            name: 'Gilson',
            address: 'address',
            cv: 'cv',
            email: 'email',
            number: 'number',
        }
        return request(app)
            .patch('/api/user/1')
            .auth(token, { type: 'bearer' })
            .send(updatedUser)
            .expect(200)
            .then(({ body }) => {
                const { user } = body;
                expect(user).toHaveProperty("user_id");
                expect(user).toHaveProperty("name");
                expect(user).toHaveProperty("email");
                expect(user).toHaveProperty("number");
                expect(user).toHaveProperty("address");
                expect(user).toHaveProperty("cv");
                expect(typeof user).toBe("object");
                expect(typeof user.user_id).toBe("number");
                expect(typeof user.name).toBe("string");
                expect(typeof user.email).toBe("string");
                expect(typeof user.number).toBe("string");
                expect(typeof user.address).toBe("string");
                expect(typeof user.cv).toBe("string");
            })
    })
})

describe("DELETE /api/user", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .delete('/api/user/not-valid')
            .auth(token, { type: 'bearer' })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when user id not found", () => {
        return request(app)
            .delete('/api/user/999')
            .auth(token, { type: 'bearer' })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("User not found");
            })
    })
    it("should respond with a 204 when user deleted", () => {
        return request(app).delete('/api/user/1').auth(token, { type: 'bearer' }).expect(204)
    })
})

