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


describe("POST /api/company", () => {
  it("should responds with a 400 satus code when the field is invalid", () => {
    const newCompany = {
      company_title: 'new company'
    }
    return request(app)
      .post('/api/company')
      .send(newCompany)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid company field");
      })
  })
  it("should responds with a 400 satus code when the value is invalid", () => {
    const newCompany = {
      company_name: 3
    }
    return request(app)
      .post('/api/company')
      .send(newCompany)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Must have a string value");
      })
  })

  it("should responds with a 201 status code and a object containing a company", () => {
    const newCompany = {
      company_name: 'new company'
    }
    return request(app)
      .post('/api/company')
      .send(newCompany)
      .expect(201)
      .then(({ body }) => {
        const { company }: { company: Company } = body;
        expect(company).toHaveProperty("company_name");
        expect(typeof company.company_name).toBe("string");
      })
  })
})