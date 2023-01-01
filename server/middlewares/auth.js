import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddeleware = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  let decodedData;

  //
  if (token) {
    console.log("Iam inside the function");
    try {
      decodedData = jwt.verify(token, process.env.TOKEN_KEY);
      console.log("decodedData", decodedData);
      //Check if token expired
      // if (decodedData.exp * 1000 < new Date().getTime()) {
      //   return res.status(401).json({ message: "Token expired" });
      // }
      req.userId = decodedData?.id;
      req.userRole = decodedData?.role;
    } catch (error) {
      console.log(error);
    }
    next();
  } else {
    res.send("NO TOKEN FOUND ");
  }
};
