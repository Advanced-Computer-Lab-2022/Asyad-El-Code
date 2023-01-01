export const checkAdmin = (req, res, next) => {
  if (req.userId && req.userAdmin == "administrator") {
    next();
  } else {
    res.status(403).send({ error: "You Are Not admin myfriend" });
  }
};
