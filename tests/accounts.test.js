import app from "../app.js";
import supertest from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

describe("accounts", () => {
  let token = null;
  let createdAccountId = null;

  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env.TESTDB_URL);
    const response = await supertest(app)
      .post("/login")
      .send({ email: "admin@admin.lt", password: "admin" });
    token = response.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /accounts", () => {
    describe("When user is logged in", () => {
      it("returns array of accounts", async () => {
        const response = await supertest(app)
          .get("/accounts")
          .set("Authorization", token);
        expect(response.status).toBe(200);
        expect(response.body[0]).toMatchObject({
          _id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          currency: {
            _id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
          },
        });
        expect(response.header["content-type"]).toBe(
          "application/json; charset=utf-8"
        );
      });
    });

    describe("When user is not logged in", () => {
      it("returns unauthorized", async () => {
        const response = await supertest(app).get("/accounts");
        expect(response.status).toBe(401);
      });
    });
  });

  describe("GET /accounts/:id", () => {
    describe("When account exists", () => {
      it("returns account object", async () => {
        const response = await supertest(app)
          .get("/accounts/6233a291e5c2500bdd0eacff")
          .set("Authorization", token);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          _id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          currency: {
            _id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
          },
        });
      });
    });

    describe("When account doesn't exist", () => {
      it("returns error", async () => {
        const response = await supertest(app)
          .get("/accounts/6233a291e5c2500bdd0eacf1")
          .set("Authorization", token);
        expect(response.status).toBe(404);
      });
    });

    describe("When provided id is invalid", () => {
      it("returns error", async () => {
        const response = await supertest(app)
          .get("/accounts/123")
          .set("Authorization", token);
        expect(response.status).toBe(400);
      });
    });

    describe("When user is not logged in", () => {
      it("returns unauthorized", async () => {
        const response = await supertest(app).get(
          "/accounts/6233a291e5c2500bdd0eacf1"
        );
        expect(response.status).toBe(401);
      });
    });

    describe("When trying to access acount that does not belong to the user", () => {
      it("returns not found", async () => {
        const response = await supertest(app)
          .get("/accounts/623899070399905fb71aa6fe")
          .set("Authorization", token);
        expect(response.status).toBe(404);
      });
    });
  });

  describe("POST /accounts", () => {
    describe("When provided data is incomplete or invalid", () => {
      it("return bad request", async () => {
        const response = await supertest(app)
          .post("/accounts")
          .send({
            title: "",
            currency: "6231ac0595f44628bc846e90",
          })
          .set("Authorization", token);
        expect(response.status).toBe(400);
      });
    });

    describe("When provided data is correct", () => {
      it("returns ok", async () => {
        const response = await supertest(app)
          .post("/accounts")
          .send({
            title: "Test account",
            currency: "6231ac0595f44628bc846e90",
          })
          .set("Authorization", token);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
          _id: expect.any(String),
          userId: expect.any(String),
          title: "Test account",
          currency: "6231ac0595f44628bc846e90",
          description: "",
        });
        createdAccountId = response.body._id;
      });
    });
  });

  describe("PATCH /accounts/:accountId", () => {
    describe("when account belongs to the user and info is correct", () => {
      it("returns updated account", async () => {
        const response = await supertest(app)
          .patch(`/accounts/${createdAccountId}`)
          .send({
            title: "Updated test account",
            description: "Testing testing 123",
          })
          .set("Authorization", token);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          _id: expect.any(String),
          userId: expect.any(String),
          title: "Updated test account",
          currency: "6231ac0595f44628bc846e90",
          description: "Testing testing 123",
        });
      });
    });
    describe("when account doesnt belong to the user and info is correct", () => {
      it("returns not found", async () => {
        const response = await supertest(app)
          .patch(`/accounts/623899070399905fb71aa6fe`)
          .send({
            title: "Updated test account",
            description: "Testing testing 123",
          })
          .set("Authorization", token);
        expect(response.status).toBe(404);
      });
    });
  });

  describe("DELETE /account/:id", () => {
    describe("when account exists and belongs to the user", () => {
      it("returns deleted acc", async () => {
        const response = await supertest(app)
          .delete(`/accounts/${createdAccountId}`)
          .set("Authorization", token);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          _id: expect.any(String),
          userId: expect.any(String),
          title: "Updated test account",
          currency: "6231ac0595f44628bc846e90",
          description: "Testing testing 123",
        });
      });
    });

    describe("when account exists but does not belong to the user", () => {
      it("returns not found", async () => {
        const response = await supertest(app)
          .delete("/accounts/623899070399905fb71aa6fe")
          .set("Authorization", token);
        expect(response.status).toBe(404);
      });
    });
  });
});
