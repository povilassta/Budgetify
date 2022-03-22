import express from "express";
import { authJwt } from "../services/auth.service.js";
import TransactionsController from "../controllers/transactions.controller.js";

const transactionsRouter = express.Router();

// GET expenses
transactionsRouter.get("/", authJwt, TransactionsController.getAll);

transactionsRouter.get("/:transactionId", authJwt, TransactionsController.get);

// POST expense
transactionsRouter.post("/", authJwt, TransactionsController.insert);

// PATCH expense
transactionsRouter.patch(
  "/:transactionId",
  authJwt,
  TransactionsController.update
);

// DELETE expense
transactionsRouter.delete(
  "/:transactionId",
  authJwt,
  TransactionsController.delete
);

export default transactionsRouter;
