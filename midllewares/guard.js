const { userRep } = require("../repository");
const jwt = require("jsonwebtoken");
const { HttpCode } = require("../config/constants");


const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return !!verify;
  } catch (error) {
    return false;
  }
};

const guard = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  }
  const payload = jwt.decode(token);
  const user = await userRep.findById(payload.id);
  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
    }
    req.user = user; // res.locals.user = user - express documentation
  next();
};

module.exports = guard;
