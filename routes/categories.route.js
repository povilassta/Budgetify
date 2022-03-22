import express from "express";
import CategoriesController from "../controllers/categories.controller.js";
import { authJwt } from "../services/auth.service.js";
import CategoryService from "../services/categories.service.js";
const categoriesRouter = express.Router();

// CATEGORIES ---------------------------------------------
// GET categories
categoriesRouter.get("/", authJwt, CategoriesController.getAll);

// GET one category
categoriesRouter.get("/:categoryId", authJwt, CategoriesController.get);

// POST category
categoriesRouter.post("/", authJwt, CategoriesController.insert);

// PATCH category
categoriesRouter.patch("/:categoryId", authJwt, CategoriesController.update);

// DELETE category
categoriesRouter.delete("/:categoryId", authJwt, CategoriesController.delete);

export default categoriesRouter;
