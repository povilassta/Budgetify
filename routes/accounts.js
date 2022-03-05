import express from "express";
import incomesRouter from "./incomes.js";
import expensesRouter from "./expenses.js";
const accountsRouter = express.Router();

// GET user's accounts
accountsRouter.get("/", (req, res) => {
  res.send(`This route returns ${req.params.userId} user's accounts`);
});

// GET user's account with an id
accountsRouter.get("/:accountId", (req, res) => {
  res.send(
    `This route returns user's account with id: ${req.params.accountId}`
  );
});

// POST user's account
accountsRouter.post("/", (req, res) => {
  res.send(`This route posts a new account for user`);
});

// PATCH user's account
accountsRouter.patch("/:accountId", (req, res) => {
  res.send(`This route updates provided fields of user's account`);
});

// DELETE user's account
accountsRouter.delete("/:accountId", (req, res) => {
  res.send(
    `This route deletes user's account with id: ${req.params.accountId}`
  );
});

// The fix for our parameters problem
accountsRouter.use(
  "/:accountId/incomes",
  function (req, res, next) {
    req.accountId = req.params.accountId;
    next();
  },
  incomesRouter
);

accountsRouter.use(
  "/:accountId/expenses",
  function (req, res, next) {
    req.accountId = req.params.accountId;
    next();
  },
  expensesRouter
);

export default accountsRouter;
