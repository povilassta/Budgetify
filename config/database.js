import mongoose from "mongoose";
import "dotenv/config";
import Account from "../models/accounts.js";
import Currency from "../models/currencies.js";
import Role from "../models/roles.js";
import User from "../models/users.js";
import Category from "../models/categories.js";

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
