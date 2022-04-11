import express from "express";
import CurrenciesController from "../controllers/currencies.controller.js";
import { authJwt } from "../services/auth.service.js";
const currnecyRouter = express.Router();

// GET categories
currnecyRouter.get("/", authJwt, CurrenciesController.getAll);

export default currnecyRouter;
