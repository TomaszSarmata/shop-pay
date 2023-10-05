import jwt from "jsonwebtoken";

//payload in the function below will contain the id
export const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "2d",
  }); //We get activation_token_secret from the .env file where we can use literally any pass
};
