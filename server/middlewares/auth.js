export const authMiddeleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const isCustomAuth = token.length < 500;
  let decodedData;
  if (token && isCustomAuth) {
    try {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } catch (error) {
      console.log(error);
    }
  } else {
    decodedData = jwt.decode(token);
    req.userId = decodedData?.sub;
  }
  next();
};
