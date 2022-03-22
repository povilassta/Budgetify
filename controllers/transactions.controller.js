import TransactionsService from "../services/transactions.service.js";

const TransactionsController = {
  getAll: async (req, res, next) => {
    const { _id: userId } = req.user;
    const { accountId } = req;

    try {
      const response = await TransactionsService.getAll(accountId, userId);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  get: async (req, res, next) => {
    const { _id: userId } = req.user;
    const { accountId } = req;
    const { transactionId } = req.params;

    try {
      const response = await TransactionsService.get(
        transactionId,
        accountId,
        userId
      );
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  insert: async (req, res, next) => {
    const { _id: userId } = req.user;
    const { accountId } = req;

    try {
      const response = await TransactionsService.insert(
        req.body,
        accountId,
        userId
      );
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    const { _id: userId } = req.user;
    const { accountId } = req;
    const { transactionId } = req.params;

    try {
      const response = await TransactionsService.update(
        req.body,
        transactionId,
        accountId,
        userId
      );
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  delete: async (req, res, next) => {
    const { _id: userId } = req.user;
    const { accountId } = req;
    const { transactionId } = req.params;

    try {
      const response = await TransactionsService.delete(
        transactionId,
        accountId,
        userId
      );
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default TransactionsController;
