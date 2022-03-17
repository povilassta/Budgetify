import express from "express";
import { authJwt } from "../services/auth.service.js";
const expensesRouter = express.Router();

// GET expenses
expensesRouter.get("/", authJwt, (req, res) => {
  res.send(
    `This route returns expenses for an account with id: ${req.accountId}`
  );
});

// POST expense
expensesRouter.post("/", authJwt, (req, res) => {
  res.send(
    `This route creates a new expense for an account with id: ${req.accountId}`
  );
});

// PATCH expense
expensesRouter.patch("/:expenseId", authJwt, (req, res) => {
  res.send(
    `This route updates ${req.params.expenseId} expense's provided details`
  );
});

// DELETE expense
expensesRouter.delete("/:expenseId", authJwt, (req, res) => {
  res.send(`This route deletes ${req.params.expenseId} expense`);
});

export default expensesRouter;
