import Category from "../models/categories.model.js";
import Transaction from "../models/transactions.model.js";
import TransactionsService from "./transactions.service.js";
import NotFoundError from "../errors/notfound.error.js";
import ConflictError from "../errors/conflict.error.js";
import BadRequestError from "../errors/badrequest.error.js";

const CategoryService = {
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
        throw new NotFoundError("Category not found");
      }
    } catch (errors) {
      throw errors;
    }
  },

  getByNameType: async (name, type, userId) => {
    try {
      const category = await Category.findOne({ name, type, userId });
      return category;
    } catch (errors) {
      throw errors;
    }
  },

  insert: async (data, userId) => {
    try {
      if (await CategoryService.getByNameType(data.name, data.type, userId)) {
        throw new BadRequestError("Category already exists");
      } else {
        const category = await Category.create({ ...data, userId });
        if (category) {
          return category;
        } else {
          throw new Error();
        }
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
        throw new NotFoundError("Category not found");
      }
    } catch (errors) {
      throw errors;
    }
  },

  delete: async (categoryId, userId) => {
    try {
      const category = await Category.findOne({ _id: categoryId, userId });
      if (category) {
        if ((await TransactionsService.getForAllAccounts(categoryId)).length) {
          throw new ConflictError("Category still has transactions");
        } else {
          category.delete();
          return category;
        }
      } else {
        throw new NotFoundError("Category not found");
      }
    } catch (errors) {
      throw errors;
    }
  },
};

export default CategoryService;
