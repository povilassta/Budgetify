import express from "express";
import { authJwt } from "../services/auth.service.js";
import categoriesService from "../services/categories.service.js";
const categoriesRouter = express.Router();

// CATEGORIES ---------------------------------------------
// GET categories
categoriesRouter.get("/", authJwt, (req, res) => {
  categoriesService.getCategories(req, res);
});

// POST category
categoriesRouter.post("/", authJwt, (req, res) => {
  categoriesService.insertCategory(req, res);
});

// PATCH category
categoriesRouter.patch("/:categoryId", authJwt, (req, res) => {
  categoriesService.updateCategory(req, res);
});

// DELETE category
categoriesRouter.delete("/:categoryId", authJwt, (req, res) => {
  res.send(`This route removes category`);
});

export default categoriesRouter;
