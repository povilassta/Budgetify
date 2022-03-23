import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcrypt";
import User from "../models/users.model.js";
import Role from "../models/roles.model.js";
import Currency from "../models/currencies.model.js";
import Account from "../models/accounts.model.js";

let mongoServer;

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async () => {
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();

  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

const seed = async () => {
  const testRole = await Role.create({
    type: "test",
  });

  const testUser = await User.create({
    email: "test@test.com",
    password: bcrypt.hashSync("test", 10),
    firstName: "Test",
    lastName: "Test",
    gender: "other",
    dateOfBirth: "2022-03-23",
    country: "Test",
    role: testRole._id,
  });

  const testCurrency = await Currency.create({
    name: "Test",
    code: "TST",
  });

  const testAccount = await Account.create({
    userId: testUser._id,
    title: "Test",
    currency: testCurrency._id,
  });

  const otherUser = await User.create({
    email: "other@other.com",
    password: bcrypt.hashSync("other", 10),
    firstName: "Other",
    lastName: "Other",
    gender: "other",
    dateOfBirth: "2022-03-23",
    country: "Other",
    role: testRole._id,
  });

  const otherAccount = await Account.create({
    userId: otherUser._id,
    title: "Test",
    currency: testCurrency._id,
  });

  return { testAccount, otherAccount, testCurrency };
};

export default { connect, close, clear, seed };
