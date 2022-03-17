import express from "express";
import { authJwt } from "../services/auth.service.js";
const categoriesRouter = express.Router();

// CATEGORIES ---------------------------------------------
// GET categories
categoriesRouter.get("/", authJwt, (req, res) => {
  res.send(`This route returns expense categories`);
});

// POST category
categoriesRouter.post("/", authJwt, (req, res) => {
  res.send(`This route creates a category`);
});

// PATCH category
categoriesRouter.patch("/:id", authJwt, (req, res) => {
  res.send(`This route updates category's details`);
});

// DELETE category
categoriesRouter.delete("/:id", authJwt, (req, res) => {
  res.send(`This route removes category`);
});

export default categoriesRouter;
