const { HttpCode } = require("../config/constants");
const rateLimit = require("express-rate-limit");

const limiter = (duration, limit) => {
  return rateLimit({
    windowMs: duration,
    max: limit, // Limit each IP to 100 requests per `window` (here, per duration)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
      res.status(HttpCode.TOO_MANY_REQUESTS).json({
        status: "error",
        code: HttpCode.TOO_MANY_REQUESTS,
        message: "Too many requests, please try again later.",
      });
    },
  });
};

module.exports = limiter;
