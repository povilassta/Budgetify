import express from "express";
import cors from "cors";
import connection from "./config/database.config.js";
import accountsRouter from "./routes/accounts.route.js";
import categoriesRouter from "./routes/categories.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/accounts", accountsRouter);
app.use("/categories", categoriesRouter);
app.use("/", authRouter);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    let errors = {};

    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    return res.status(400).send(errors);
  } else if (err.name === "NotFoundError") {
    return res.status(err.statusCode).json({ message: err.message });
  } else if (err.name === "DuplicateError") {
    return res.status(err.statusCode).json({ message: err.message });
  } else if (err.name === "CastError") {
    return res.status(400).json({ message: "Provided id is invalid" });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
  next(err);
});

//app.listen(3000);

export default app;
