import { beforeEach, afterAll, describe, it, expect } from "vitest";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"
import request from "supertest"
import app from "../app.js";
import type { Job } from "../types/index.js";

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

describe('GET /api/job', () => {
    it("should respond with 200 and an array of jobs", () => {
        return request(app)
            .get('/api/job')
            .expect(200)
            .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                const job: Job[] = body;
                job.forEach((job) => {
                    expect(job).toHaveProperty("job_id");
                    expect(job).toHaveProperty("title");
                    expect(job).toHaveProperty("location");
                    expect(job).toHaveProperty("pay");
                    expect(job).toHaveProperty("type");
                    expect(job).toHaveProperty("company_id");
                    expect(job).toHaveProperty("description");
                    expect(typeof job).toBe("object");
                    expect(typeof job.job_id).toBe("number");
                    expect(typeof job.title).toBe("string");
                    expect(typeof job.location).toBe("string");
                    expect(typeof job.pay).toBe("string");
                    expect(typeof job.type).toBe("string");
                    expect(typeof job.company_id).toBe("number");
                    expect(typeof job.description).toBe("string");
                })

            })
    })
});

describe('GET /api/job/search?', () => {
    it("should respond with 404 when query don't match any job", () => {
        return request(app)
            .get('/api/job/search?job_title=Brave&company_name=Brave')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('No job found')
            })
    })
    it("should respond with 200 and all jobs when no input", () => {
        return request(app)
            .get('/api/job/search?job_title=&company_name=')
            .expect(200)
            .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                const job: Job[] = body;
                job.forEach((job) => {
                    expect(job).toHaveProperty("job_id");
                    expect(job).toHaveProperty("title");
                    expect(job).toHaveProperty("location");
                    expect(job).toHaveProperty("pay");
                    expect(job).toHaveProperty("type");
                    expect(job).toHaveProperty("company_id");
                    expect(job).toHaveProperty("description");
                    expect(job).toHaveProperty("company_name");
                    expect(typeof job).toBe("object");
                    expect(typeof job.job_id).toBe("number");
                    expect(typeof job.title).toBe("string");
                    expect(typeof job.location).toBe("string");
                    expect(typeof job.pay).toBe("string");
                    expect(typeof job.type).toBe("string");
                    expect(typeof job.company_id).toBe("number");
                    expect(typeof job.description).toBe("string");
                    expect(typeof job.company_name).toBe("string");
                })
            })
    })
    it("should respond with 200 and all jobs matching job_title query", () => {
        return request(app)
            .get('/api/job/search?job_title=cleaner&company_name=cleaner')
            .expect(200)
            .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                const job: Job[] = body;
                job.forEach((job) => {
                    expect(job).toHaveProperty("job_id");
                    expect(job).toHaveProperty("title");
                    expect(job).toHaveProperty("location");
                    expect(job).toHaveProperty("pay");
                    expect(job).toHaveProperty("type");
                    expect(job).toHaveProperty("company_id");
                    expect(job).toHaveProperty("description");
                    expect(job).toHaveProperty("company_name");
                    expect(typeof job).toBe("object");
                    expect(typeof job.job_id).toBe("number");
                    expect(typeof job.title).toBe("string");
                    expect(typeof job.location).toBe("string");
                    expect(typeof job.pay).toBe("string");
                    expect(typeof job.type).toBe("string");
                    expect(typeof job.company_id).toBe("number");
                    expect(typeof job.description).toBe("string");
                    expect(typeof job.company_name).toBe("string");
                })
            })
    })
    it("should respond with 200 and all jobs matching company_name query", () => {
        return request(app)
            .get('/api/job/search?job_title=cleaner&company_name=cleaner&skills_name=cleaner')
            .expect(200)
            .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                const job: Job[] = body;
                job.forEach((job) => {
                    console.log(job)
                    expect(job).toHaveProperty("job_id");
                    expect(job).toHaveProperty("title");
                    expect(job).toHaveProperty("location");
                    expect(job).toHaveProperty("pay");
                    expect(job).toHaveProperty("type");
                    expect(job).toHaveProperty("company_id");
                    expect(job).toHaveProperty("description");
                    expect(job).toHaveProperty("company_name");
                    expect(typeof job).toBe("object");
                    expect(typeof job.job_id).toBe("number");
                    expect(typeof job.title).toBe("string");
                    expect(typeof job.location).toBe("string");
                    expect(typeof job.pay).toBe("string");
                    expect(typeof job.type).toBe("string");
                    expect(typeof job.company_id).toBe("number");
                    expect(typeof job.description).toBe("string");
                    expect(typeof job.company_name).toBe("string");
                })
            })
    })
    it("should respond with 200 and all jobs matching skills query", () => {
        return request(app)
            .get('/api/job/search?job_title=teamwork&company_name=teamwork&skills_name=teamwork')
            .expect(200)
            .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                const job: Job[] = body;
                job.forEach((job) => {
                    console.log(job)
                    expect(job).toHaveProperty("job_id");
                    expect(job).toHaveProperty("title");
                    expect(job).toHaveProperty("location");
                    expect(job).toHaveProperty("pay");
                    expect(job).toHaveProperty("type");
                    expect(job).toHaveProperty("company_id");
                    expect(job).toHaveProperty("description");
                    expect(job).toHaveProperty("company_name");
                    expect(typeof job).toBe("object");
                    expect(typeof job.job_id).toBe("number");
                    expect(typeof job.title).toBe("string");
                    expect(typeof job.location).toBe("string");
                    expect(typeof job.pay).toBe("string");
                    expect(typeof job.type).toBe("string");
                    expect(typeof job.company_id).toBe("number");
                    expect(typeof job.description).toBe("string");
                    expect(typeof job.company_name).toBe("string");
                })
            })
    })
});

describe("GET /api/job/:job_id", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .get('/api/job/not-valid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when user id not found", () => {
        return request(app)
            .get('/api/job/999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Job not found");
            })
    })
    it.only("should respond with 200 and an object containing a job", () => {
        return request(app)
            .get('/api/job/1')
            .expect(200)
            .then(({ body }) => {
                const { job } = body;
                console.log(job)
                expect(job).toHaveProperty("job_id");
                expect(job).toHaveProperty("title");
                expect(job).toHaveProperty("location");
                expect(job).toHaveProperty("pay");
                expect(job).toHaveProperty("type");
                expect(job).toHaveProperty("company_id");
                expect(job).toHaveProperty("description");
                expect(typeof job).toBe("object");
                expect(typeof job.job_id).toBe("number");
                expect(typeof job.title).toBe("string");
                expect(typeof job.location).toBe("string");
                expect(typeof job.pay).toBe("string");
                expect(typeof job.type).toBe("string");
                expect(typeof job.company_id).toBe("number");
                expect(typeof job.description).toBe("string");
            })
    })
})

describe("PATCH /api/job/:job_id", () => {
    it("should respond with 400 when invalid params", () => {
        const updatedJob = {
            title: 'new title',
            location: 'address'
        }
        return request(app)
            .patch('/api/job/not-valid')
            .send(updatedJob)
            .expect(400)
            .then(({ body }) => { expect(body.msg).toBe("Invalid params") })
    })
    it("should respond with a 400 when invalid field", () => {
        const updatedJob = {
            name: 'new title',
            location: 'address'
        }
        return request(app)
            .patch('/api/job/1')
            .send(updatedJob)
            .expect(400)
            .then(({ body }) => { expect(body.msg).toBe(body.msg) })
    })
    it("should respond with a 400 when invalid value", () => {
        const updatedJob = {
            title: 'new',
            location: 5
        }
        return request(app)
            .patch('/api/job/1')
            .send(updatedJob)
            .expect(400)
            .then(({ body }) => { expect(body.msg).toBe(body.msg) })
    })
    it("should respond with a 404 when job_id not found", () => {
        const updatedJob = {
            title: 'new',
            location: 'address'
        }
        return request(app)
            .patch('/api/job/999')
            .send(updatedJob)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Job not found");
            })
    })
    it("should respond with a 200 with an object containing the updated job", () => {
        const updatedJob = {
            title: 'new job',
            location: 'address'
        }
        return request(app)
            .patch('/api/job/1')
            .send(updatedJob)
            .expect(200)
            .then(({ body }) => {
                const { job } = body;
                expect(job).toHaveProperty("job_id");
                expect(job).toHaveProperty("title");
                expect(job).toHaveProperty("location");
                expect(job).toHaveProperty("pay");
                expect(job).toHaveProperty("type");
                expect(job).toHaveProperty("company_id");
                expect(job).toHaveProperty("description");
                expect(typeof job).toBe("object");
                expect(typeof job.job_id).toBe("number");
                expect(typeof job.title).toBe("string");
                expect(typeof job.location).toBe("string");
                expect(typeof job.pay).toBe("string");
                expect(typeof job.type).toBe("string");
                expect(typeof job.company_id).toBe("number");
                expect(typeof job.description).toBe("string");
            })
    })
})

describe("POST /api/job", () => {
    it("should responds with a 400 satus code when the field is invalid", () => {
        const newJob = {
            title: 'title',
            location: 'location',
            money: 'pay',
            type: 'type',
            company_id: 1,
            description: '',
        }
        return request(app)
            .post('/api/job')
            .send(newJob)
            .expect(400)
            .then(({ body }) => { expect(body.msg).toBe(body.msg) })
    })
    it("should responds with a 400 satus code when the value is invalid", () => {
        const newJob = {
            title: 'title',
            location: 'location',
            pay: 'pay',
            type: 3,
            company_id: 1,
            description: { about_us: '', job_details: '', requirements: '', shift_pattern: '' },
        }
        return request(app)
            .post('/api/job')
            .send(newJob)
            .expect(400)
            .then(({ body }) => { expect(body.msg).toBe(body.msg) })
    })
    it("should responds with a 404 satus code when the company not found", () => {
        const newJob = {
            title: 'title',
            location: 'location',
            pay: 'pay',
            type: 'type',
            company_id: 999,
            description: '{  }',
        }
        return request(app)
            .post('/api/job')
            .send(newJob)
            .expect(404)
            .then(({ body }) => { expect(body.msg).toBe(body.msg) })
    })
    it("should responds with a 201 status code and an object containing a job", () => {
        const newJob = {
            title: 'title',
            location: 'location',
            pay: 'pay',
            type: 'type',
            company_id: 1,
            description: '',
        }
        return request(app)
            .post('/api/job')
            .send(newJob)
            .expect(201)
            .then(({ body }) => {
                const { job } = body;
                expect(job).toHaveProperty("job_id");
                expect(job).toHaveProperty("title");
                expect(job).toHaveProperty("location");
                expect(job).toHaveProperty("pay");
                expect(job).toHaveProperty("type");
                expect(job).toHaveProperty("company_id");
                expect(job).toHaveProperty("description");
                expect(typeof job).toBe("object");
                expect(typeof job.job_id).toBe("number");
                expect(typeof job.title).toBe("string");
                expect(typeof job.location).toBe("string");
                expect(typeof job.pay).toBe("string");
                expect(typeof job.type).toBe("string");
                expect(typeof job.company_id).toBe("number");
                expect(typeof job.description).toBe("string");
            })
    })
})

describe("DELETE /api/job", () => {
    it("should respond with 400 when invalid params", () => {
        return request(app)
            .delete('/api/job/not-valid')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid params");
            })
    })
    it("should respond with 404 when user id not found", () => {
        return request(app)
            .delete('/api/job/999')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Job not found");
            })
    })
    it("should respond with a 204 when job deleted", () => {
        return request(app).delete('/api/job/1').expect(204)
    })

})



