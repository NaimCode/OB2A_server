const checkToken = (req, res, next) => {
  if (req.headers.Authorization) {
    if (req.headers.Authorization == req.body.token) next();
    else res.status(500).json("Token invalide");
  }
};
