const sql = require("mssql");
const {
  isUsernameExists,
  isEmailExists,
  isUsernameChange,
  isEmailChange,
} = require("../../utils/query");

exports.get = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("customerId", sql.Char, req.params.id).query(`
        SELECT * FROM customers 
        WHERE customerId = @customerId`);

    res.status(200).json(recordset[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .query(`SELECT * FROM Customers ORDER BY createdAt DESC`);

    res.status(200).json(recordset);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { username, name, family, email, password, phone, birthday } =
      req.body;

    if (
      (await isUsernameExists(req, username)) &&
      (await isUsernameChange(req, username, req.params.id))
    ) {
      return res.status(403).json({ message: "Username is already taken" });
    }

    if (
      (await isEmailExists(req, email)) &&
      (await isEmailChange(req, email, req.params.id))
    ) {
      return res.status(403).json({ message: "This email is already exists" });
    }

    await req.app.locals.db
      .request()
      .input("customerId", sql.Char, req.params.id)
      .input("username", sql.VarChar, username)
      .input("name", sql.NVarChar, name)
      .input("family", sql.NVarChar, family)
      .input("password", sql.NVarChar, password)
      .input("email", sql.NVarChar, email)
      .input("phone", sql.Char, phone)
      .input("birthday", sql.NVarChar, birthday).query(`UPDATE Customers
        SET
          username = @username,
          name = @name,
          family = @family,
          password = @password,
          email = @email,
          phone = @phone,
          birthday = @birthday
        WHERE customerId = @customerId
      `);

    res.status(200).json({ message: "User Succesfully Update" });
  } catch (error) {
    console.log("Update customer Error", error);

    res.status(500).json({ message: "SERVER ERROR" });
  }
};

exports.remove = async (req, res, next) => {
  try {
    await req.app.locals.db
      .request()
      .input("customerId", sql.Char, req.params.id)
      .query(`DELETE FROM Customers 
        WHERE customerId = @customerId`);

    res.status(200).send({ message: "User Succesfully Delete" });
  } catch (error) {
    res.status(500).send({ message: "SERVER ERROR" });
  }
};
