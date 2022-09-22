import jwt from "jsonwebtoken";

export const createUserToken = (id) => {
  return {
    access(id) {
      return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
    },
    refresh(id) {
      return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "180days",
      });
    },
  };
};

export const authToken = (req, res, next) => {
  let token = req.cookies.loginCookie;
};
