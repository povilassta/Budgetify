import app from "../app.js";
import supertest from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

describe("auth", () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env.TESTDB_URL);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /login", () => {
    describe("When email and password are correct", () => {
      it("returns jwt token", async () => {
        const response = await supertest(app)
          .post("/login")
          .send({ email: "admin@admin.lt", password: "admin" });
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
