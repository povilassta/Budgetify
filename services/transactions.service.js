import Transaction from "../models/transactions.model.js";
import Account from "../models/accounts.model.js";
import Category from "../models/categories.model.js";

const transactionsService = {
  getTransactions: async (req, res) => {
    try {
      if (await transactionsService.isAccountValid(req, res)) {
        const transactions = await Transaction.find({
          accountId: req.accountId,
        });
        res.status(200).json(transactions);
      } else {
        res.status(400).json({
          message: "Account, whose transactions are requested, does not exist.",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  insertTransaction: async (req, res) => {
    try {
      if (await transactionsService.isAccountValid(req, res)) {
        const transaction = new Transaction();
        transaction.accountId = req.accountId;
        transaction.title = req.body.title;
        transaction.type = req.body.type;
        transaction.date = Date.parse(req.body.date);
        transaction.amount = req.body.amount;
        transaction.category = await transactionsService.getCategoryId(
          req,
          res
        );

        transaction.save((err, doc) => {
          if (err) res.status(500).json(err);
          else res.status(201).json({ message: "Transaction created." });
        });
      } else {
        res.status(400).json({
          message:
            "Account for which a transaction is being created, does not exist.",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateTransaction: async (req, res) => {
    try {
      if (await transactionsService.isAccountValid(req, res)) {
        const { category, ...rest } = req.body;
        // Check if category is present in the request, if so then get its id
        if (category) {
          rest.category = await transactionsService.getCategoryId(req, res);
        }
        const updatedTransaction = await Transaction.findOneAndUpdate(
          { _id: req.params.transactionId, accountId: req.accountId },
          rest
        );
        // Check if a transaction has been found and updated
        if (!updatedTransaction) {
          res.status(404).json("Transaction not found.");
        } else {
          res.status(200).json({ message: "Transaction updated." });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  removeTransaction: async (req, res) => {
    try {
      if (await transactionsService.isAccountValid(req, res)) {
        const transactionToDelete = await Transaction.findOne({
          accountId: req.accountId,
          _id: req.params.transactionId,
        });
        if (transactionToDelete) {
          transactionToDelete.deleteOne();
          res.status(200).json({ message: "Transaction deleted." });
        } else {
          res.status(404).json({ message: "Transaction not found." });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getCategoryId: async (req, res) => {
    let type;

    // Check if request contains category type, if it does not it means this is an update transaction call, so we fetch the type from the transaction.
    if (!req.body.type) {
      const transaction = await Transaction.findOne({
        _id: req.params.transactionId,
        accountId: req.accountId,
      });
      type = transaction.type;
    }

    const category = await Category.findOne({
      userId: req.user._id,
      name: req.body.category,
      type: type,
    });

    // Check if category exists, if it does just send back the Id, if it doesn't create a new category with the provided name and type
    if (category) {
      return category._id;
    } else {
      const categoryToCreate = new Category();
      categoryToCreate.userId = req.user._id;
      categoryToCreate.name = req.body.category;
      categoryToCreate.type = type;

      const createdCategory = await categoryToCreate.save();
      return createdCategory._id;
    }
  },

  // Check if account exists and if it belongs to the user making the call
  isAccountValid: async (req, res) => {
    const account = await Account.findOne({
      userId: req.user._id,
      _id: req.accountId,
    });

    return account;
  },
};

export default transactionsService;
