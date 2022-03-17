import Account from "../models/accounts.js";

const accountsService = {
  addAccountIdParam: (req) => {
    req.accountId = req.params.accountId;
  },

  insertAccount: async (req, res) => {
    const account = await Account.create({
      userId: req.user._id,
      title: req.body.title,
      description: req.body.description,
      currency: req.body.currency,
    });

    account.save((err, doc) => {
      if (err) res.status(500);
      else res.status(201).json({ message: "Account created." });
    });
  },

  getAccounts: async (req, res) => {
    try {
      const accounts = await Account.find({ userId: req.user._id }).populate(
        "currency"
      );
      //console.log(accounts);
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

  editAccount: async (req, res) => {
    try {
      const updateResult = await Account.updateOne(
        { _id: req.params.accountId, userId: req.user._id },
        req.body
      );
      if (updateResult.n == 0) {
        res.status(404).json("Account not found.");
      } else {
        res.status(200).json({ message: "Account updated." });
      }
    } catch (err) {
      res.status(500).json({ message: "Something went wrong." });
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
