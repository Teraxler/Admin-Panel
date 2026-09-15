const sql = require("mssql");

exports.isAdmin = async (req, username) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("username", sql.VarChar, username)
      .query(
        `SELECT * FROM Users WHERE username = @username AND role = 'ADMIN'`,
      );

    return recordset.length > 0 ? true : false;
  } catch (error) {
    console.log("Is Admin", error);
  }
};
