import Category from "../models/categories.model.js";
import Transaction from "../models/transactions.model.js";

const categoriesService = {
  getAll: async (userId) => {
    try {
      const categories = await Category.find({ userId });
      return categories;
    } catch (errors) {
      throw errors;
    }
  },

  get: async (categoryId, userId) => {
    try {
      const category = await Category.findOne({ _id: categoryId, userId });
      if (category) {
        return category;
      } else {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (errors) {
      throw errors;
    }
  },

  insert: async (data, userId) => {
    try {
      const category = await Category.create({ ...data, userId });
      if (category) {
        return category;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (errors) {
      throw errors;
    }
  },

  update: async (data, categoryId, userId) => {
    try {
      const category = await Category.findOneAndUpdate(
        { _id: categoryId, userId },
        data,
        { new: true }
      );
      if (category) {
        return category;
      } else {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (errors) {
      throw errors;
    }
  },

  delete: async (categoryId, userId) => {},
};

export default categoriesService;
