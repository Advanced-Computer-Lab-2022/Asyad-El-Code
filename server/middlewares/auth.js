import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddeleware = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  let decodedData;
  if (token) {
    console.log("Iam inside the function");
    try {
      decodedData = jwt.verify(token, process.env.TOKEN_KEY);
      req.userId = decodedData?.id;
      req.userRole = decodedData?.role;
    } catch (error) {
      console.log(error);
    }
    console.log("I will gothere");
    next();
  } else {
    res.send("NO TOKEN FOUND ");
  }
};
