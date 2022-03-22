function errorHandler(err, req, res, next) {
  const customErrorNames = ["ConflictError", "DuplicateError", "NotFoundError"];
  if (err.name === "ValidationError") {
    let errors = {};

    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    return res.status(400).send(errors);
  } else if (customErrorNames.includes(err.name)) {
    return res.status(err.statusCode).json({ message: err.message });
  } else if (err.name === "CastError") {
    return res.status(400).json({ message: "Provided id is invalid" });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
  next(err);
}

export default errorHandler;
