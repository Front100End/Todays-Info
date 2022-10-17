import jwt from "jsonwebtoken";

export const createUserToken = (id) => {
  return {
    access(id) {
      return jwt.sign({ id }, process.env.REACT_APP_ACCESS_TOKEN_SECRET, {
        expiresIn: "6h",
      });
    },
    refresh(id) {
      return jwt.sign({ id }, process.env.REACT_APP_REFRESH_TOKEN_SECRET, {
        expiresIn: "180days",
      });
    },
  };
};
