import { afterAll, describe, it, expect, beforeAll, afterEach } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { Company } from "../types/index.js";

beforeAll(() => {
    return seed(data)
});

afterAll(() => {
    return db.end();
});

let token: string

describe("GET /api/company/:company_id", () => {
    it("should respond with 404 when email not found", () => {
        const login = {
            email: "vertextalen@company.com",
            password: "company123",
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
            email: "vertextalent@company.com",
            password: "company12",
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
            email: "vertextalent@company.com",
            password: "company123",
        }
        return request(app)
            .post('/api/login')
            .send(login)
            .expect(200)
            .then((body) => {
                token = body.body.token
            }).then(() => {
                return request(app)
                    .get('/api/company/not-valid')
                    .auth(token, { type: 'bearer' })
                    .expect(400).then(({ body }) => {
                        expect(body.msg).toBe("Invalid params");
                    })
            })
    })
    it("should respond with 404 when company id not found", () => {
        return request(app)
            .get('/api/company/999')
            .auth(token, { type: 'bearer' })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Company not found");
            })
    })
    it("should respond with 200 and an object containing a company", () => {
        return request(app)
            .get('/api/company/1')
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(({ body }) => {
                const { company }: { company: Company } = body;
                expect(company).toHaveProperty("company_id");
                expect(company).toHaveProperty("company_name");
                expect(company).toHaveProperty("email");
                expect(company).toHaveProperty("number");
                expect(company).toHaveProperty("address");
                expect(company).toHaveProperty("jobs_posted");
                expect(company).toHaveProperty("jobs_posted[0].title");
                expect(company).toHaveProperty("jobs_posted[0].job_id");
                expect(company).toHaveProperty("jobs_posted[0].location");
                expect(typeof company).toBe("object");
                expect(typeof company.company_id).toBe("number");
                expect(typeof company.company_name).toBe("string");
                expect(typeof company.email).toBe("string");
                expect(typeof company.number).toBe("string");
                expect(typeof company.address).toBe("string");
                expect(typeof company.jobs_posted).toBe("object");
                expect(typeof company.jobs_posted?.[0].title).toBe("string");
                expect(typeof company.jobs_posted?.[0].job_id).toBe("number");
                expect(typeof company.jobs_posted?.[0].location).toBe("string");
            })
    })
})

describe("PATCH /api/company/:company_id", () => {
    it("should respond with 400 when invalid params", () => {
        const updatedCompany = {
            company_name: 'new company',
            email: 'email',
            number: 'number',
            address: 'address',
        }
        return request(app)
            .patch('/api/company/not-valid')
            .auth(token, { type: 'bearer' })
            .send(updatedCompany)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with a 400 when invalid field", () => {
        const updatedCompany = {
            company_title: 'new company',
            email: 'email',
            number: 'number',
            address: 'address'
        }
        return request(app)
            .patch('/api/company/1')
            .auth(token, { type: 'bearer' })
            .send(updatedCompany)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe(body.msg);
            })
    })
    it("should respond with a 400 when invalid value", () => {
        const updatedCompany = {
            company_name: 2,
            email: 'email',
            number: 'number',
            address: 'address'
        }
        return request(app)
            .patch('/api/company/1')
            .auth(token, { type: 'bearer' })
            .send(updatedCompany)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe(body.msg);
            })
    })
    it("should respond with a 404 when company_id not found", () => {
        const updatedCompany = {
            company_name: 'new company',
            email: 'email',
            number: 'number',
            address: 'address'
        }
        return request(app)
            .patch('/api/company/999')
            .auth(token, { type: 'bearer' })
            .send(updatedCompany)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Company not found");
            })
    })
    it("should respond with a 200 with an object containing the updated company", () => {
        const updatedCompany = {
            company_name: 'new company',
            email: 'email',
            number: 'number',
            address: 'address'
        }
        return request(app)
            .patch('/api/company/1')
            .auth(token, { type: 'bearer' })
            .send(updatedCompany)
            .expect(200)
            .then(({ body }) => {
                const { company }: { company: Company } = body;
                expect(company).toHaveProperty("company_id");
                expect(company).toHaveProperty("company_name");
                expect(company).toHaveProperty("email");
                expect(company).toHaveProperty("password");
                expect(company).toHaveProperty("number");
                expect(company).toHaveProperty("address");
                expect(typeof company).toBe("object");
                expect(typeof company.company_id).toBe("number");
                expect(typeof company.company_name).toBe("string");
                expect(typeof company.email).toBe("string");
                expect(typeof company.password).toBe("string");
                expect(typeof company.number).toBe("string");
                expect(typeof company.address).toBe("string");
            })
    })
})

describe("DELETE /api/company", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .delete('/api/company/not-valid')
            .auth(token, { type: 'bearer' })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when company id not found", () => {
        return request(app)
            .delete('/api/company/999')
            .auth(token, { type: 'bearer' })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Company not found");
            })
    })
    it("should respond with a 204 when company deleted", () => {
        return request(app).delete('/api/company/1').auth(token, { type: 'bearer' }).expect(204)
    })

})


