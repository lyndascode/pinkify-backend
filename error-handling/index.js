module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }
  });

  // Better error handling for JWT errors
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        message: 'Invalid or expired token',
        code: err.code,
        expiredAt: err.inner?.expiredAt
      });
    }
    next(err);
  });
};
