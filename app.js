import express from "express";
import cors from "cors";
import connection from "./config/database.config.js";
import accountsRouter from "./routes/accounts.route.js";
import categoriesRouter from "./routes/categories.route.js";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/accounts", accountsRouter);
app.use("/categories", categoriesRouter);
app.use("/", authRouter);

app.use(errorHandler);

export default app;
