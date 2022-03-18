import express from "express";
import transactionsRouter from "./transactions.route.js";
import accountsService from "../services/accounts.service.js";
import { authJwt } from "../services/auth.service.js";
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
  accountsService.updateAccount(req, res);
});

// DELETE user's account
accountsRouter.delete("/:accountId", authJwt, (req, res) => {
  accountsService.deleteAccount(req, res);
});

// The fix for our parameters problem
accountsRouter.use(
  "/:accountId/transactions",
  function (req, res, next) {
    accountsService.addAccountIdParam(req);
    next();
  },
  transactionsRouter
);

export default accountsRouter;
