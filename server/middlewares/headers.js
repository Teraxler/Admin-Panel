exports.setHeaders = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.DOMAIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.setHeader(
  //   "Content-Security-Policy",
  //   "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;",
  // );

  next();
};
