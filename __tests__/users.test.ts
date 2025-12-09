import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { User } from "../types/index.ts";

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

describe("GET /api/users/:user_id", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .get('/api/users/not-valid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when user id not found", () => {
        return request(app)
            .get('/api/users/999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("User not found");
            })
    })
    it("should respond with 200 and an object containing a user", () => {
        return request(app)
            .get('/api/users/1')
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

describe("PATCH /api/users/:user_id", () => {
    it("should respond with 400 when invalid params", () => {
        const updatedUser = {
            name: 'Gilson',
            address: 'address',
            password: 'password',
        }
        return request(app)
            .patch('/api/users/not-valid')
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
            .patch('/api/users/1')
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
            .patch('/api/users/1')
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
            .patch('/api/users/999')
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
            password: 'password',
        }
        return request(app)
            .patch('/api/users/1')
            .send(updatedUser)
            .expect(200)
            .then(({ body }) => {
                const { user } = body;
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

describe("POST /api/users", () => {
    it("should responds with a 400 satus code when the field is invalid", () => {
        const newUser = {
            name: 'Gilson',
            avatar_img: 'image',
            email: 'email',
            password: 'password',
            telephone: 'number',
            address: 'address',
            cv: 'cv'
        }
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .then(({ body }) => { expect(body.msg).toBe(body.msg) })
    })
    it("should responds with a 400 satus code when the value is invalid", () => {
        const newUser = {
            name: 'Gilson',
            avatar_img: 'image',
            email: 'email',
            password: 'password',
            number: 98934,
            address: 'address',
            cv: 'cv'
        }
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .then(({ body }) => { expect(body.msg).toBe(body.msg) })
    })
    it("should responds with a 201 status code and an object containing a user", () => {
        const newUser = {
            name: 'Gilson',
            email: 'email',
            password: 'password',
            number: '98934',
            address: 'address',
            cv: 'cv'
        }
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .then(({ body }) => {
                const { user } = body;
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

describe("DELETE /api/users", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .delete('/api/users/not-valid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when user id not found", () => {
        return request(app)
            .delete('/api/users/999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("User not found");
            })
    })
    it("should respond with a 204 when user deleted", () => {
        return request(app).delete('/api/users/1').expect(204)
    })

})



