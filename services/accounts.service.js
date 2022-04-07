import Account from "../models/accounts.model.js";
import CurrencyService from "./currencies.service.js";
import NotFoundError from "../errors/notfound.error.js";

const AccountsService = {
  addAccountIdParam: (req) => {
    req.accountId = req.params.accountId;
  },

  getAll: async (userId) => {
    try {
      const accounts = await Account.find({ userId })
        .populate("currency")
        .populate("transactions");
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
        throw new NotFoundError("Account not found");
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
          throw new Error();
        }
      }
    } catch (errors) {
      throw errors;
    }
  },

  update: async (data, accountId, userId) => {
    try {
      if (
        !data.currency ||
        (data.currency && (await CurrencyService.get(data.currency)))
      ) {
        const account = await Account.findOneAndUpdate(
          { _id: accountId, userId },
          data,
          { new: true }
        );
        if (account) {
          return account;
        } else {
          throw new NotFoundError("Account not found");
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
        throw new NotFoundError("Account not found");
      }
    } catch (errors) {
      throw errors;
    }
  },
};

export default AccountsService;
