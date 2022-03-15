import mongoose from "mongoose";
import "dotenv/config";

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
