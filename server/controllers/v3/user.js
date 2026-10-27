const sql = require("mssql");
const bcrypt = require("bcrypt");
const { editUserSchema } = require("../../validators/authValidator");

const { isEmailExists } = require("../../middlewares/isEmailExists");
const { isEmailChanged } = require("../../middlewares/isEmailChanged");
const { isPasswordMatch } = require("../../middlewares/isPasswordMatch");
const { isUsernameExists } = require("../../middlewares/isUsernameExists");
const { isUsernameChanged } = require("../../middlewares/isUsernameChanged");
const { success } = require("zod");

exports.get = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("userId", sql.Char, req.params.id).query(`
        SELECT userId, name, family, username, email, role, phone, birthday
        FROM Users 
        WHERE userId = @userId`);

    if (recordset.length) return res.status(200).json({ data: recordset[0] });

    res.status(404).json({ message: "User Not Found (404)" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db.request().query(`
          SELECT userId, name, family, username, email, role, phone, birthday
          FROM Users WHERE
          role = 'USER' ORDER BY createdAt DESC`);

    if (recordset.length) return res.status(200).json(recordset);

    res.status(404).json({ message: "No User Found (404)" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      username,
      name,
      family,
      email,
      password,
      newPassword,
      phone,
      birthday,
    } = req.body;

    const { success, error } = editUserSchema.safeParse({
      password: null,
      ...req.body,
    });

    if (!success)
      return res.status(400).json({ message: error.issues[0].message });

    if (password != null && !(await isPasswordMatch(req, password)))
      return res.status(400).json({ message: "Password is not correct" });

    if (
      (await isUsernameExists(req, username)) &&
      (await isUsernameChanged(req, username))
    )
      return res.status(403).json({ message: "Username is already taken" });

    if ((await isEmailExists(req, email)) && (await isEmailChanged(req, email)))
      return res.status(403).json({ message: "This email is already exists" });

    const hashedNewPassword =
      newPassword && (await bcrypt.hash(newPassword, 10));

    await req.app.locals.db
      .request()
      .input("userId", sql.Char, req.params.id)
      .input("username", sql.VarChar, username)
      .input("name", sql.NVarChar, name)
      .input("family", sql.NVarChar, family)
      .input("password", sql.NVarChar, hashedNewPassword)
      .input("email", sql.NVarChar, email)
      .input("phone", sql.Char, phone)
      .input("birthday", sql.NVarChar, birthday).query(`UPDATE Users
        SET
          username = @username,
          name = @name,
          family = @family,
          ${password != null && newPassword != null ? "password = @password," : ""}
          email = @email,
          phone = @phone,
          birthday = @birthday
        WHERE userId = @userId
      `);

    res.status(200).json({
      message: "User Succesfully Update",
      data: {
        userId: req.params.id,
        name,
        family,
        username,
        email,
        phone,
        birthday,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.remove = async (req, res, next) => {
  try {
    await req.app.locals.db.request().input("userId", sql.Char, req.params.id)
      .query(`DELETE FROM Users 
        WHERE userId = @userId`);

    res.status(200).json({
      message: "User deleted successfully",
      data: { userId: req.params.id },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
