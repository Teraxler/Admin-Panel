const { categorySchema } = require("../../validators/categoryValidator");
const { idGenerator } = require("../../utils/query");
const sql = require("mssql");

exports.create = async (req, res, next) => {
  try {
    const { success, error } = categorySchema.safeParse(req.body);

    if (!success)
      return res.status(400).json({ message: error.issues[0].message });

    await req.app.locals.db
      .request()
      .input("categoryId", sql.Char, idGenerator(10))
      .input("categoryName", sql.NVarChar, req.body.categoryName)
      .query(`INSERT INTO Categories (categoryId, categoryName)
        VALUES( @categoryId, @categoryName)`);

    res.status(202).json({ message: "Category Created Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

exports.get = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("categoryId", sql.Char, req.params.id)
      .query(
        `SELECT categoryId, categoryName As name 
        FROM Categories
        WHERE categoryId = @categoryId
        `,
      );

    res.status(200).json(recordset[0]);
  } catch (error) {
    res.status(404).send("404 Not Found");
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db.query(
      `SELECT categoryId, categoryName As name 
      FROM Categories ORDER BY name`,
    );

    res.status(200).json(recordset);
  } catch (error) {
    res.status(404).send("No Category Found");
  }
};

exports.update = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("categoryName", sql.NVarChar, req.body.categoryName)
      .input("categoryId", sql.Char, req.params.id)
      .query(
        `
        UPDATE Categories 
        SET categoryName = @categoryName 
        WHERE categoryId = @categoryId
        `,
      );

    res.status(200).json(recordset);
  } catch (error) {
    res.status(404).json({ message: "No Category Found" });
  }
};

exports.remove = async (req, res, next) => {
  try {
    await req.app.locals.db
      .request()
      .input("categoryId", sql.Char, req.params.id).query(`
        DELETE FROM Categories 
        WHERE categoryId = @categoryId
      `);

    res.status(200).json({ message: "Category deleted Succesfully" });
  } catch (error) {
    res.status(404).send("No Category Found");
  }
};
