import { beforeEach, afterAll } from "@jest/globals";
import db from "../data/connection.js";
import { seed } from "../data/seeding/seed.js";
import { data } from "../data/index.js"

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});
