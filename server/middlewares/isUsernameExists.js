const sql = require("mssql");

exports.isUsernameExists = async (req, username) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("username", sql.VarChar, username)
      .query(`SELECT COUNT(*) AS count FROM Users WHERE username = @username`);

    return recordset[0].count ? true : false;
  } catch (error) {
    console.log("Is Username Exists", error);
  }
};
