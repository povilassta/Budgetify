const accountsService = {
  addAccountIdParam: (req) => {
    req.accountId = req.params.accountId;
  },
};

export default accountsService;
