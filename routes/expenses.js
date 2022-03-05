import express from "express";
const expensesRouter = express.Router();

// GET expenses
expensesRouter.get("/", (req, res) => {
  res.send(
    `This route returns expenses for an account with id: ${req.accountId}`
  );
});

// POST expense
expensesRouter.post("/", (req, res) => {
  res.send(
    `This route creates a new expense for an account with id: ${req.accountId}`
  );
});

// PATCH expense
expensesRouter.patch("/:expenseId", (req, res) => {
  res.send(
    `This route updates ${req.params.expenseId} expense's provided details`
  );
});

// DELETE expense
expensesRouter.delete("/:expenseId", (req, res) => {
  res.send(`This route deletes ${req.params.expenseId} expense`);
});

export default expensesRouter;
