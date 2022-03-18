import express from "express";
import { authJwt } from "../services/auth.service.js";
import transactionsService from "../services/transactions.service.js";

const transactionsRouter = express.Router();

// GET expenses
transactionsRouter.get("/", authJwt, (req, res) => {
  transactionsService.getTransactions(req, res);
});

// POST expense
transactionsRouter.post("/", authJwt, (req, res) => {
  transactionsService.insertTransaction(req, res);
});

// PATCH expense
transactionsRouter.patch("/:transactionId", authJwt, (req, res) => {
  transactionsService.updateTransaction(req, res);
});

// DELETE expense
transactionsRouter.delete("/:transactionId", authJwt, (req, res) => {
  transactionsService.removeTransaction(req, res);
});

export default transactionsRouter;
