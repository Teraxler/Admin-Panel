const sql = require("mssql");

exports.isEmailExists = async (req, email) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("email", sql.VarChar, email)
      .query(`SELECT COUNT(*) AS count FROM Users WHERE email = @email`);

    return recordset[0].count ? true : false;
  } catch (error) {
    console.log("Is Email Exists", error);
  }
};
