import Transaction from "../models/transactions.model.js";
import AccountsService from "./accounts.service.js";
import CategoryService from "./categories.service.js";

const transactionsService = {
  getAll: async (accountId, userId) => {
    try {
      if (await AccountsService.get(accountId, userId)) {
        const transactions = await Transaction.find({ accountId });
        return transactions;
      } else {
        const error = new Error("Account not found");
        error.name = "NotFoundError";
        error.statusCode = 404;
        throw error;
      }
    } catch (errors) {
      throw errors;
    }
  },

  get: async (transactionId, accountId, userId) => {
    try {
      if (await AccountsService.get(accountId, userId)) {
        const transaction = await Transaction.findOne({
          _id: transactionId,
          accountId,
        });
        if (transaction) {
          return transaction;
        } else {
          const error = new Error("Transaction not found");
          error.name = "NotFoundError";
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error = new Error("Account not found");
        error.name = "NotFoundError";
        error.statusCode = 404;
        throw error;
      }
    } catch (errors) {
      throw errors;
    }
  },

  getForAllAccounts: async (categoryId) => {
    try {
      const transactions = await Transaction.find({ category: categoryId });
      return transactions;
    } catch (errors) {
      throw errors;
    }
  },

  insert: async (data, accountId, userId) => {
    try {
      if (await AccountsService.get(accountId, userId)) {
        const category = await CategoryService.getByNameType(
          data.category,
          data.type,
          userId
        );

        if (category) {
          data.category = category._id;
        } else {
          const newCategory = await CategoryService.insert(
            { name: data.category, type: data.type },
            userId
          );
          data.category = newCategory._id;
        }

        const transaction = await Transaction.create({ ...data, accountId });

        return transaction;
      } else {
        const error = new Error("Account not found");
        error.name = "NotFoundError";
        error.statusCode = 404;
        throw error;
      }
    } catch (errors) {
      throw errors;
    }
  },

  delete: async (transactionId, accountId, userId) => {
    try {
      if (await AccountsService.get(accountId, userId)) {
        const transaction = await Transaction.deleteOne({
          _id: transactionId,
          accountId,
        });
        if (transaction) {
          return transaction;
        } else {
          const error = new Error("Transaction not found");
          error.name = "NotFoundError";
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error = new Error("Account not found");
        error.name = "NotFoundError";
        error.statusCode = 404;
        throw error;
      }
    } catch (errors) {
      throw errors;
    }
  },
};

export default transactionsService;
