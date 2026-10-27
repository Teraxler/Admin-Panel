const sql = require("mssql");
const bcrypt = require("bcrypt");

exports.isPasswordMatch = async (req, password) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("userId", sql.Char, req.params.id)
      .input("username", sql.VarChar, req.body.username)
      .query(
        `SELECT userId, password 
            FROM Users 
            WHERE ${req.params.id ? "userId = @userId" : "username = @username"}`,
      );

    return recordset.length
      ? await bcrypt.compare(password, recordset[0]?.password)
      : false;
  } catch (error) {
    console.log("Is Password Match", error);
  }
};
