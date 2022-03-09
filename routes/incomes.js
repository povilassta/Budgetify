import express from "express";
import { authJwt } from "../services/auth.js";
const incomesRouter = express.Router();

// GET incomes
incomesRouter.get("/", authJwt, (req, res) => {
  res.send(
    `This route returns incomes for an account with id: ${req.accountId}`
  );
});

// POST income
incomesRouter.post("/", authJwt, (req, res) => {
  res.send(
    `This route creates a new income for an account with id: ${req.accountId}`
  );
});

// PATCH income
incomesRouter.patch("/:incomeId", authJwt, (req, res) => {
  res.send(
    `This route updates ${req.params.incomeId} income's provided details`
  );
});

// DELETE income
incomesRouter.delete("/:incomeId", authJwt, (req, res) => {
  res.send(`This route deletes ${req.params.incomeId} income`);
});

export default incomesRouter;
