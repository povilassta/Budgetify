import express from "express";
const incomesRouter = express.Router();

// GET incomes
incomesRouter.get("/", (req, res) => {
  res.send(
    `This route returns incomes for an account with id: ${req.accountId}`
  );
});

// POST income
incomesRouter.post("/", (req, res) => {
  res.send(
    `This route creates a new income for an account with id: ${req.accountId}`
  );
});

// PATCH income
incomesRouter.patch("/:incomeId", (req, res) => {
  res.send(
    `This route updates ${req.params.incomeId} income's provided details`
  );
});

// DELETE income
incomesRouter.delete("/:incomeId", (req, res) => {
  res.send(`This route deletes ${req.params.incomeId} income`);
});

export default incomesRouter;
