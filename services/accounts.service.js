import Account from "../models/accounts.model.js";
import CurrencyService from "./currencies.service.js";

const AccountsService = {
  addAccountIdParam: (req) => {
    req.accountId = req.params.accountId;
  },

  getAll: async (userId) => {
    try {
      const accounts = await Account.find({ userId }).populate("currency");
      return accounts;
    } catch (errors) {
      throw errors;
    }
  },

  get: async (accountId, userId) => {
    try {
      const account = await Account.findOne({
        _id: accountId,
        userId,
      }).populate("currency");
      if (!account) {
        let error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
      }
      return account;
    } catch (errors) {
      throw errors;
    }
  },

  insert: async (data, userId) => {
    try {
      if (await CurrencyService.get(data.currency)) {
        const account = await Account.create({ ...data, userId });

        if (account) {
          return account;
        } else {
          throw new Error("Something went wrong");
        }
      }
    } catch (errors) {
      throw errors;
    }
  },

  update: async (data, accountId, userId) => {
    try {
      if (data.currency && (await CurrencyService.get(data.currency))) {
        const account = await Account.findOneAndUpdate(
          { _id: accountId, userId },
          data,
          { new: true }
        );
        if (account) {
          return account;
        } else {
          const error = new Error("Account not found");
          error.statusCode = 404;
          throw error;
        }
      }
    } catch (errors) {
      throw errors;
    }
  },

  delete: async (accountId, userId) => {
    try {
      const account = await Account.findOne({
        _id: accountId,
        userId,
      });
      if (account) {
        await account.deleteOne();
        return account;
      } else {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (errors) {
      throw errors;
    }
  },
};

export default AccountsService;
