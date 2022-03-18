import Account from "../models/accounts.model.js";
import Currency from "../models/currencies.model.js";

const accountsService = {
  addAccountIdParam: (req) => {
    req.accountId = req.params.accountId;
  },

  insertAccount: async (req, res) => {
    const checkCurrency = await Currency.findById(req.body.currency);
    if (!checkCurrency)
      res.status(400).json({ message: "Provided currency does not exist." });
    else {
      const account = new Account();
      account.userId = req.user._id;
      account.title = req.body.title;
      account.description = req.body.description;
      account.currency = req.body.currency;

      account.save((err, doc) => {
        if (err) res.status(500).json(err);
        else res.status(201).json({ message: "Account created." });
      });
    }
  },

  getAccounts: async (req, res) => {
    try {
      const accounts = await Account.find({ userId: req.user._id }).populate(
        "currency"
      );
      res.status(200).json(accounts);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong." });
    }
  },

  getAccountById: async (req, res) => {
    try {
      const account = await Account.find({
        _id: req.params.accountId,
        userId: req.user._id,
      });
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "Account not found." });
      }
    } catch (err) {
      res.status(500).json({ message: "Something went wrong." });
    }
  },

  updateAccount: async (req, res) => {
    try {
      const updatedAccout = await Account.findOneAndUpdate(
        { _id: req.params.accountId, userId: req.user._id },
        req.body
      );
      if (!updatedAccout) {
        res.status(404).json("Account not found.");
      } else {
        res.status(200).json({ message: "Account updated." });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteAccount: async (req, res) => {
    const accountToDelete = await Account.findOne({
      userId: req.user._id,
      _id: req.params.accountId,
    });
    if (accountToDelete) {
      accountToDelete.deleteOne();
      res.status(200).json({ message: "Account deleted." });
    } else {
      res.status(404).json({ message: "Account not found." });
    }
  },
};

export default accountsService;
