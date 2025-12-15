import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { User } from "../types/index.ts";

beforeEach(() => {
    return seed(data)
});

afterAll(() => {
    return db.end();
});

describe("checks if attempting to access a non-existent endpoint", () => {
    it("should respond with a 404 status code for invalid endpoint", () => {
        return request(app).get("/api/not-valid").expect(404)
    });
});

describe("POST /api/user", () => {
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
            .post('/api/user')
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
            .post('/api/user')
            .send(newUser)
            .expect(400)
            .then(({ body }) => { expect(body.msg).toBe(body.msg) })
    })
    it("should responds with a 400 code when email already exists", () => {
        const newUser = {
            name: 'Gilson',
            email: 'user@user.com',
            password: 'password',
            number: '98934',
            address: 'address',
            cv: 'cv'
        }
        return request(app)
            .post('/api/user')
            .send(newUser)
            .expect(400)
            .then(({ body }) => { expect(body.msg).toBe("User email already exists") })
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
            .post('/api/user')
            .send(newUser)
            .expect(201)
            .then(({ body }) => {
                const user: User = body;
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






