import express from "express";
import accountsRouter from "./routes/accounts.js";

const app = express();

app.use(express.json());

//Routes
app.use("/accounts", accountsRouter);

app.listen(3000);
