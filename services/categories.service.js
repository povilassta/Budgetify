import Category from "../models/categories.model.js";
import Transaction from "../models/transactions.model.js";

const categoriesService = {
  insertCategory: async (req, res) => {
    const sameCategory = await Category.findOne({
      userId: req.user._id,
      name: req.body.name,
      type: req.body.type,
    });

    if (!sameCategory) {
      const category = new Category();
      category.userId = req.user._id;
      category.name = req.body.name;
      category.type = req.body.type;

      category.save((err, doc) => {
        if (err) res.status(500).json(err);
        else res.status(201).json({ message: "Category created." });
      });
    } else {
      res.status(400).json({
        message: "Category of the same name and type already exists.",
      });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({ userId: req.user._id });
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong." });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: req.params.categoryId, userId: req.user._id },
        req.body
      );
      if (!updatedCategory) {
        res.status(404).json("Category not found.");
      } else {
        res.status(200).json({ message: "Category updated." });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteCategory: async (req, res) => {
    const categoryToDelete = await Category.findOne({
      userId: req.user._id,
      _id: req.params.accountId,
    });

    if (categoryToDelete) {
      const checkTransactions = await Transaction.find({
        accountId: req.params.accountId,
      });
      if (!checkTransactions) {
        categoryToDelete.deleteOne();
        res.status(200).json({ message: "Category deleted." });
      } else {
        res.status(400).json({
          message: "Category can't be deleted, because it has transfers in it.",
        });
      }
    } else {
      res.status(404).json({ message: "Category not found." });
    }
  },
};

export default categoriesService;
