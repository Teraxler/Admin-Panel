const sql = require("mssql");

exports.isEmailChanged = async (req, email) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("userId", sql.Char, req.params.id)
      .input("email", sql.NVarChar, email)
      .query(
        `SELECT COUNT(*) AS count FROM Users WHERE email = @email AND userId = @userId`,
      );

    return recordset[0].count > 0 ? false : true;
  } catch (error) {
    console.log("Is Email Changed", error);
  }
};
