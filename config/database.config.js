import mongoose from "mongoose";
import "dotenv/config";
import Account from "../models/accounts.model.js";
import Currency from "../models/currencies.model.js";
import Role from "../models/roles.model.js";
import User from "../models/users.model.js";
import Category from "../models/categories.model.js";
import Transaction from "../models/transactions.model.js";

class Connection {
  constructor() {
    const url = process.env.DB_URL;

    this.connect(url)
      .then(() => {
        console.log("✔ Database Connected");
      })
      .catch((err) => {
        console.error("✘ MONGODB ERROR: ", err.message);
      });
  }

  async connect(url) {
    try {
      await mongoose.connect(url);
    } catch (e) {
      throw e;
    }
  }
}

export default new Connection();
