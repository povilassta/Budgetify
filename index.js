import express from "express";
import cors from "cors";
import accountsRouter from "./routes/accounts.js";
import categoriesRouter from "./routes/categories.js";
import authRouter from "./routes/auth.js";
import connection from "./config/database.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/accounts", accountsRouter);
app.use("/categories", categoriesRouter);
app.use("/", authRouter);

app.listen(3000);
