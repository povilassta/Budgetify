import express from "express";
import incomesRouter from "./incomes.js";
import expensesRouter from "./expenses.js";
import accountsService from "../services/accounts.js";
import { authJwt } from "../services/auth.js";
const accountsRouter = express.Router();

// GET user's accounts
accountsRouter.get("/", authJwt, (req, res) => {
  res.send(`This route returns user's accounts`);
});

// GET user's account with an id
accountsRouter.get("/:accountId", authJwt, (req, res) => {
  res.send(
    `This route returns user's account with id: ${req.params.accountId}`
  );
});

// POST user's account
accountsRouter.post("/", authJwt, (req, res) => {
  res.send(`This route posts a new account for user`);
});

// PATCH user's account
accountsRouter.patch("/:accountId", authJwt, (req, res) => {
  res.send(`This route updates provided fields of user's account`);
});

// DELETE user's account
accountsRouter.delete("/:accountId", authJwt, (req, res) => {
  res.send(
    `This route deletes user's account with id: ${req.params.accountId}`
  );
});

// The fix for our parameters problem
accountsRouter.use(
  "/:accountId/incomes",
  function (req, res, next) {
    accountsService.addAccountIdParam(req);
    next();
  },
  incomesRouter
);

accountsRouter.use(
  "/:accountId/expenses",
  function (req, res, next) {
    accountsService.addAccountIdParam(req);
    next();
  },
  expensesRouter
);

export default accountsRouter;
