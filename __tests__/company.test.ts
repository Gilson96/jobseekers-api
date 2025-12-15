import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { Company } from "../types/index.ts";

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


describe("POST /api/company", () => {
  it("should responds with a 400 satus code when the field is invalid", () => {
    const newCompany = {
      company_title: 'new company',
      email: 'email',
      password: 'password',
      number: 'number',
      address: 'address',
    }
    return request(app)
      .post('/api/company')
      .send(newCompany)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(body.msg);
      })
  })
  it("should responds with a 400 satus code when the value is invalid", () => {
    const newCompany = {
      company_name: 3,
      email: 'email',
      password: 'password',
      number: 'number',
      address: 'address'
    }
    return request(app)
      .post('/api/company')
      .send(newCompany)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(body.msg);
      })
  })
  it("should responds with a 201 status code and an object containing a company", () => {
    const newCompany = {
      company_name: 'new company',
      email: 'email',
      password: 'password',
      number: 'number',
      address: 'address'
    }
    return request(app)
      .post('/api/company')
      .send(newCompany)
      .expect(201)
      .then(({ body }) => {
        const company: Company = body;
        expect(company).toHaveProperty("company_id");
        expect(company).toHaveProperty("company_name");
        expect(company).toHaveProperty("email");
        expect(company).toHaveProperty("number");
        expect(company).toHaveProperty("address");
        expect(typeof company).toBe("object");
        expect(typeof company.company_id).toBe("number");
        expect(typeof company.company_name).toBe("string");
        expect(typeof company.email).toBe("string");
        expect(typeof company.number).toBe("string");
        expect(typeof company.address).toBe("string");
      })
  })
})




