import express from "express";
import { login, register } from "../services/auth.js";
const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  login(req, res);
});

authRouter.post("/register", (req, res) => {
  register(req, res);
});

export default authRouter;
