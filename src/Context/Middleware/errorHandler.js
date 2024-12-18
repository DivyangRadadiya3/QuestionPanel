const errorHandler = (err, req, res, next) => {
  const error = err;
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({ error, message });
};

module.exports = errorHandler;
