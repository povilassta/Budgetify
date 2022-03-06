import express from "express";
const categoriesRouter = express.Router();

// CATEGORIES ---------------------------------------------
// GET categories
categoriesRouter.get("/", (req, res) => {
  res.send(`This route returns expense categories`);
});

// POST category
categoriesRouter.post("/", (req, res) => {
  res.send(`This route creates a category`);
});

// PATCH category
categoriesRouter.patch("/:id", (req, res) => {
  res.send(`This route updates category's details`);
});

// DELETE category
categoriesRouter.delete("/:id", (req, res) => {
  res.send(`This route removes category`);
});

export default categoriesRouter;
