import Currency from "../models/currencies.model.js";

const CurrencyService = {
  get: async (currencyId) => {
    try {
      const currency = await Currency.findById(currencyId);
      if (currency) {
        return currency;
      } else {
        const error = new Error("Currency not found");
        error.name = "NotFoundError";
        error.statusCode = 404;
        throw error;
      }
    } catch (errors) {
      throw errors;
    }
  },
};

export default CurrencyService;
