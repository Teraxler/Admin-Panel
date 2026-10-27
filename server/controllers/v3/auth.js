const sql = require("mssql");
const bcrypt = require("bcrypt");
const {
  loginSchema,
  registerSchema,
} = require("../../validators/authValidator");

const { idGenerator } = require("../../utils/query");

const { isUsernameExists } = require("../../middlewares/isUsernameExists");
const { isEmailExists } = require("../../middlewares/isEmailExists");
const { isPasswordMatch } = require("../../middlewares/isPasswordMatch");

exports.register = async (req, res, next) => {
  try {
    const {
      name,
      family,
      username,
      email,
      phone = null,
      birthday = null,
      password,
    } = req.body;

    const { success, error } = registerSchema.safeParse(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!success)
      return res.status(400).json({ message: error.issues[0].message });

    if (await isUsernameExists(req, username))
      return res.status(400).json({ message: "Username is already taken" });

    if (await isEmailExists(req, email))
      return res.status(400).json({ message: "This email is already exists" });

    const userId = idGenerator(10);

    await req.app.locals.db
      .request()
      .input("userId", sql.Char, userId)
      .input("name", sql.NVarChar, name)
      .input("family", sql.NVarChar, family)
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("phone", sql.Char, phone)
      .input("birthday", sql.Date, birthday)
      .input("password", sql.VarChar, hashedPassword)
      .query(`INSERT INTO Users (userId, name, family, username, email, password, phone, birthday)
    VALUES(
      @userId,
      @name,
      @family,
      @username,
      @email,
      @password,
      @phone,
      @birthday
      )`);

    res.status(201).json({
      message: "User created successfully",
      data: { userId, name, family, username, email, phone, birthday },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { success, error } = loginSchema.safeParse(req.body);

    if (!success)
      return res.status(400).json({ message: error.issues[0].message });

    if (await isPasswordMatch(req, password)) {
      try {
        const { recordset } = await req.app.locals.db
          .request()
          .input("username", sql.VarChar, username)
          .query(`SELECT userId FROM Users WHERE username = @username`);

        return res
          .status(200)
          .json({
            message: "You logged in successfully",
            data: { userId: recordset[0].userId },
          });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }

    res.status(400).json({ message: "Username or password is wrong!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
