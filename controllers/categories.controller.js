import CategoriesService from "../services/categories.service.js";

const CategoriesController = {
  getAll: async (req, res, next) => {
    const { _id: userId } = req.user;

    try {
      const response = await CategoriesService.getAll(userId);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  get: async (req, res, next) => {},

  insert: async (req, res, next) => {
    const { _id: userId } = req.user;
    try {
      const response = await CategoriesService.insert(req.body, userId);
      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    const { categoryId } = req.params;
    const { _id: userId } = req.user;

    try {
      const reponse = await CategoriesService.update(
        req.body,
        categoryId,
        userId
      );
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  delete: async (req, res, next) => {},
};

export default CategoriesController;
