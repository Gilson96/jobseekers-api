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


describe("GET /api/company/:company_id", () => {
  it("should respond with 400 when invalid params", () => {
    return request(app)
      .get('/api/company/not-valid')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid params");
      })
  })
  it("should respond with 404 when company id not found", () => {
    return request(app)
      .get('/api/company/999')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Company not found");
      })
  })

  it("should respond with 200 and an object containing a company", () => {
    return request(app)
      .get('/api/company/1')
      .expect(200)
      .then(({ body }) => {
        const { company }: { company: Company } = body;
        expect(company).toHaveProperty("company_id");
        expect(company).toHaveProperty("company_name");
        expect(company).toHaveProperty("email");
        expect(company).toHaveProperty("password");
        expect(company).toHaveProperty("number");
        expect(company).toHaveProperty("address");
        expect(company).toHaveProperty("role");
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

describe("DELETE /api/company", () => {
  it("should respond with 400 when invalid params", () => {
    return request(app)
      .delete('/api/company/not-valid')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid params");
      })
  })
  it("should respond with 404 when company id not found", () => {
    return request(app)
      .delete('/api/company/999')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Company not found");
      })
  })
  it("should respond with a 204 when company deleted", () => {
    return request(app).delete('/api/company/1').expect(204)
  })

})



