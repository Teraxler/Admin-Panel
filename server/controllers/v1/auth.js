const { registerSchema } = require("../../validators/registerValidator");
const { LoginSchema, loginSchema } = require("../../validators/loginValidator");
const {
  idGenerator,
  isUsernameExists,
  isEmailExists,
} = require("../../utils/query");
const sql = require("mssql");

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

    if (!success)
      return res.status(400).json({ message: error.issues[0].message });

    if (await isUsernameExists(req, username))
      return res.status(400).json({ message: "Username is already taken" });

    if (await isEmailExists(req, email))
      return res.status(400).json({ message: "This email is already exists" });

    const customerId = idGenerator(10);

    await req.app.locals.db
      .request()
      .input("customerId", sql.Char, customerId)
      .input("name", sql.NVarChar, name)
      .input("family", sql.NVarChar, family)
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("phone", sql.Char, phone)
      .input("birthday", sql.Date, birthday)
      .input("password", sql.VarChar, password)
      .query(`INSERT INTO Customers (customerId, name, family, username, email, password, createdAt, phone, birthday)
    VALUES(
      @customerId,
      @name,
      @family,
      @username,
      @email,
      @password,
      '${new Date().toISOString()}',
      @phone,
      @birthday
      )`);

    res.status(202).json({ customerId });
  } catch (error) {
    console.log("Register Error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { success, error } = loginSchema.safeParse(req.body);

    if (!success)
      return res.status(400).json({ message: error.issues[0].message });

    const { recordset } = await req.app.locals.db
      .request()
      .input("username", sql.VarChar, username)
      .query(
        `SELECT customerId, password 
        FROM Customers 
        WHERE username = @username`
      );

    if (recordset[0]?.password === password)
      return res.status(200).json({ customerId: recordset[0].customerId });

    res.status(404).json({ message: "Username or password is wrong!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
};
