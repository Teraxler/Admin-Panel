const sql = require("mssql");

exports.isUsernameChanged = async (req, username) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("userId", sql.Char, req.params.id)
      .input("username", sql.VarChar, username)
      .query(
        `SELECT COUNT(*) AS count FROM Users WHERE username = @username AND userId = @userId`,
      );

    return recordset[0].count > 0 ? false : true;
  } catch (error) {
    console.log("Is Username Changed",error);
  }
};
