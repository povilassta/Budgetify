import AccountsService from "../services/accounts.service.js";

const AccountsController = {
  getAll: async (req, res, next) => {
    const { _id: userId } = req.user;
    try {
      const response = await AccountsService.getAll(userId);
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  get: async (req, res, next) => {
    const { accountId } = req.params;
    const { _id: userId } = req.user;

    try {
      const response = await AccountsService.get(accountId, userId);
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  insert: async (req, res, next) => {
    const { _id: userId } = req.user;

    try {
      const response = await AccountsService.insert(req.body, userId);
      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    const { accountId } = req.params;
    const { _id: userId } = req.user;

    try {
      const response = await AccountsService.update(
        req.body,
        accountId,
        userId
      );
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  delete: async (req, res, next) => {
    const { accountId } = req.params;
    const { _id: userId } = req.user;

    try {
      const response = await AccountsService.delete(accountId, userId);
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default AccountsController;
