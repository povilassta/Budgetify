import express from "express";
import accountsRouter from "./routes/accounts.js";
import categoriesRouter from "./routes/categories.js";

const app = express();

app.use(express.json());

//Routes
app.use("/accounts", accountsRouter);
app.use("/categories", categoriesRouter);

app.listen(3000);
