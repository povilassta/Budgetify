import express from "express";
import { login } from "../services/auth.js";
const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  login(req, res);
});

export default authRouter;
