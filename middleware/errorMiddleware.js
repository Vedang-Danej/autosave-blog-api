const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// error handler of the API that sends details about the error
// only if the server is running in development mode

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV == 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
