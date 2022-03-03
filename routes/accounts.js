import express from "express";
const accountsRouter = express.Router();

// GET user's accounts
accountsRouter.get("", (req, res) => {
  res.send(`This route returns ${req.params.userId} user's accounts`);
});

// GET user's account with an id
accountsRouter.get("/:id", (req, res) => {
  console.log(req.params);
  res.send(`This route returns user's account with id: ${req.params.id}`);
});

// POST user's account
accountsRouter.post("/", (req, res) => {
  res.send(`This route posts a new account for user`);
});

// PATCH user's account
accountsRouter.patch("/:id", (req, res) => {
  res.send(`This route updates provided fields of user's account`);
});

// DELETE user's account
accountsRouter.delete("/:id", (req, res) => {
  res.send(`This route deletes user's account with id: ${req.params.id}`);
});

// INCOMES ----------------------------------------------
// GET incomes
accountsRouter.get("/:id/incomes", (req, res) => {
  res.send(
    `This route returns incomes for an account with id: ${req.params.id}`
  );
});

// POST income
accountsRouter.post("/:id/incomes", (req, res) => {
  res.send(
    `This route creates a new income for an account with id: ${req.params.id}`
  );
});

// PATCH income
accountsRouter.patch("/:id/incomes/:incomeId", (req, res) => {
  res.send(
    `This route updates ${req.params.incomeId} income's provided details`
  );
});

// DELETE income
accountsRouter.delete("/:id/incomes/:incomeId", (req, res) => {
  res.send(`This route deletes ${req.params.incomeId} income`);
});

// EXPENSES ----------------------------------------------
// GET expenses
accountsRouter.get("/:id/expenses", (req, res) => {
  res.send(
    `This route returns expenses for an account with id: ${req.params.id}`
  );
});

// POST expense
accountsRouter.post("/:id/expenses", (req, res) => {
  res.send(
    `This route creates a new expense for an account with id: ${req.params.id}`
  );
});

// PATCH expense
accountsRouter.patch("/:id/expenses/:expenseId", (req, res) => {
  res.send(
    `This route updates ${req.params.expenseId} expense's provided details`
  );
});

// DELETE expense
accountsRouter.delete("/:id/expenses/:expenseId", (req, res) => {
  res.send(`This route deletes ${req.params.expenseId} expense`);
});

export default accountsRouter;
