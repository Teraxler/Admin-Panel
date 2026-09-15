const sql = require("mssql");
const { categorySchema } = require("../../validators/categoryValidator");
const { idGenerator } = require("../../utils/query");

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const { success, error } = categorySchema.safeParse({ name });

    if (!success)
      return res.status(400).json({ message: error.issues[0].message });

    const categoryId = idGenerator(10);

    const { recordset } = await req.app.locals.db
      .request()
      .input("categoryId", sql.Char, categoryId)
      .input("categoryName", sql.NVarChar, name)
      .query(`INSERT INTO Categories (categoryId, categoryName)
        VALUES(@categoryId, @categoryName)`);

    res.status(202).json({
      message: "Category created succesfully",
      data: { categoryId, name },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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

    res.status(200).json({ data: recordset[0] });
  } catch (error) {
    res.status(404).json({ message: "No user found" });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db.query(
      `SELECT categoryId, categoryName As name 
      FROM Categories ORDER BY name`,
    );

    res.status(200).json({ data: recordset });
  } catch (error) {
    res.status(404).json({ message: "No category found" });
  }
};

exports.update = async (req, res, next) => {
  try {
    await req.app.locals.db
      .request()
      .input("categoryName", sql.NVarChar, req.body.name)
      .input("categoryId", sql.Char, req.params.id)
      .query(
        `
        UPDATE Categories 
        SET categoryName = @categoryName 
        WHERE categoryId = @categoryId
      `,
      );

    res.status(200).json({
      message: "Category updated successfully",
      data: {
        categoryId: req.params.id,
        name: req.body.categoryName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
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

    res.status(200).json({
      message: "Category deleted succesfully",
      data: { categoryId: req.params.id },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
