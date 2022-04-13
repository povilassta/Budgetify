import Currency from "../models/currencies.model.js";
import NotFoundError from "../errors/notfound.error.js";

const CurrencyService = {
  get: async (currencyId) => {
    try {
      const currency = await Currency.findById(currencyId);
      if (currency) {
        return currency;
      } else {
        throw new NotFoundError("Currency not found");
      }
    } catch (errors) {
      throw errors;
    }
  },
  getAll: async () => {
    try {
      const currencies = await Currency.find();
      return currencies;
    } catch (errors) {
      throw errors;
    }
  },
};

export default CurrencyService;
