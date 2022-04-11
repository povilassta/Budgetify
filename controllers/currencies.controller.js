import CurrencyService from "../services/currencies.service.js";

const CurrenciesController = {
  getAll: async (req, res, next) => {
    try {
      const response = await CurrencyService.getAll();
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default CurrenciesController;
