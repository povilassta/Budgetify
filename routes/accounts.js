import express from "express";
import incomesRouter from "./incomes.js";
import expensesRouter from "./expenses.js";
import accountsService from "../services/accounts.js";
import { authJwt } from "../services/auth.js";
const accountsRouter = express.Router();

// GET user's accounts
accountsRouter.get("/", authJwt, (req, res) => {
  accountsService.getAccounts(req, res);
});

// GET user's account with an id
accountsRouter.get("/:accountId", authJwt, (req, res) => {
  accountsService.getAccountById(req, res);
});

// POST user's account
accountsRouter.post("/", authJwt, (req, res) => {
  accountsService.insertAccount(req, res);
});

// PATCH user's account
accountsRouter.patch("/:accountId", authJwt, (req, res) => {
  accountsService.editAccount(req, res);
});

// DELETE user's account
accountsRouter.delete("/:accountId", authJwt, (req, res) => {
  accountsService.deleteAccount(req, res);
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
