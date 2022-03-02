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

export default accountsRouter;
