import express from "express";
import transactionsRouter from "./transactions.route.js";
import AccountsController from "../controllers/accounts.contoller.js";
import { authJwt } from "../services/auth.service.js";
import AccountsService from "../services/accounts.service.js";
const accountsRouter = express.Router();

// GET user's accounts
accountsRouter.get("/", authJwt, AccountsController.getAll);

// GET user's account with an id
accountsRouter.get("/:accountId", authJwt, AccountsController.get);

// POST user's account
accountsRouter.post("/", authJwt, AccountsController.insert);

// PATCH user's account
accountsRouter.patch("/:accountId", authJwt, AccountsController.update);

// DELETE user's account
accountsRouter.delete("/:accountId", authJwt, AccountsController.delete);

// The fix for our parameters problem
accountsRouter.use(
  "/:accountId/transactions",
  function (req, res, next) {
    AccountsService.addAccountIdParam(req);
    next();
  },
  transactionsRouter
);

export default accountsRouter;
