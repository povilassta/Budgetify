import supertest from "supertest";
import db from "./db.js";
import app from "../app.js";

describe("auth", () => {
  beforeAll(async () => {
    await db.connect();
    await db.seed();
  });

  afterAll(async () => {
    await db.clear();
    await db.close();
  });

  describe("POST /login", () => {
    describe("When email and password are correct", () => {
      it("returns jwt token", async () => {
        const response = await supertest(app)
          .post("/login")
          .send({ email: "test@test.com", password: "test" });
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          token: expect.any(String),
        });
        expect(response.header["content-type"]).toBe(
          "application/json; charset=utf-8"
        );
      });
    });

    describe("When login details are not correct", () => {
      it("returns error message", async () => {
        const response = await supertest(app)
          .post("/login")
          .send({ email: "wrong@wrong.com", password: "wrong" });
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
          message: "Invalid credentials",
        });
        expect(response.header["content-type"]).toBe(
          "application/json; charset=utf-8"
        );
      });
    });
  });
});
