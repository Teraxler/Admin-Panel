const sql = require("mssql");

exports.autheticated = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]?.split(" ")[1];

    const { recordset } = req.app.locals.db
      .request()
      .input("userId", sql.VarChar, authHeader)
      .query(`SELECT COUNT(*) AS count FROM Users WHERE userId = @userId`);

    const isAuthenticate = recordset[0]?.count > 0;

    if (isAuthenticate) return next();

    throw new Error("This route is protected");
  } catch (error) {
    return res.status(403).json({ message: "This route is protected" });
  }
};
