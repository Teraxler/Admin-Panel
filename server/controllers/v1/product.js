// const { productSchema } = require("../../validators/productValidator");
const { idGenerator } = require("../../utils/query");
const sql = require("mssql");

exports.create = async (req, res, next) => {
  try {
    const cover = req.file?.filename;

    const { description, name, inventory = 0, price, categoryId } = req.body;

    await req.app.locals.db
      .request()
      .input("productId", sql.Char, idGenerator(10))
      .input("name", sql.NVarChar, name)
      .input("description", sql.NVarChar, description)
      .input("categoryId", sql.Char, categoryId ? categoryId : null)
      .input("price", sql.SmallMoney, price)
      .input("inventory", sql.SmallInt, inventory)
      .input("cover", sql.NVarChar, cover ? cover : "default-product.svg")
      .query(
        `
        INSERT INTO Products (productId, name, description, categoryId, price, inventory, cover) 
        VALUES(
          @productId,
          @name, 
          @description,
          @categoryId,
          @price, 
          @inventory,
          @cover
        )`
      );

    res.status(202).json({ message: "Product Created Succesfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "SERVER ERROR" });
  }
};

exports.get = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("productId", sql.Char, req.params.id)
      .query(
        `
          SELECT p.name, p.description, p.price, p.cover, p.inventory, p.createdAt, p.productId, c.categoryId, c.categoryName   
          FROM Products p
          LEFT JOIN Categories c ON p.categoryId = c.categoryId
          WHERE p.productId = @productId
          ORDER BY p.createdAt DESC;
        `
      );

    res.status(200).json(recordset[0]);
  } catch (error) {
    res.status(404).json({ message: "Product Not Found" });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db.request().query(
      `
        SELECT p.name, p.description, p.price, p.cover, p.inventory, p.createdAt, p.productId, c.categoryId, c.categoryName   
        FROM Products p
        LEFT JOIN Categories c ON p.categoryId = c.categoryId
        ORDER BY p.createdAt DESC
      `
    );

    res.status(200).json(recordset);
  } catch (error) {
    res.status(404).send("No Product Found");
  }
};

exports.update = async (req, res, next) => {
  try {
    const cover = req.file?.filename;

    const {
      name,
      description,
      price,
      inventory = 0,
      categoryId = null,
    } = req.body;
    console.log("🚀 ~ price:", price);

    const { recordset } = await req.app.locals.db
      .request()
      .input("productId", sql.Char, req.params.id)
      .input("cover", sql.NVarChar, cover ? cover : null)
      .input("name", sql.NVarChar, name)
      .input("price", sql.SmallMoney, price)
      .input("inventory", sql.SmallInt, inventory)
      .input("categoryId", sql.Char, categoryId ? categoryId : null)
      .input("description", sql.NVarChar, description)
      .query(
        `
        UPDATE Products SET 
          cover = COALESCE(@cover, cover),
          name = @name,
          price = @price,
          inventory = @inventory,
          categoryId = @categoryId,
          description = @description
        WHERE productId = @productId
        `
      );

    res.status(200).json(recordset);
  } catch (error) {
    console.log("Product Edit", error);

    res.status(404).send("No Product Found");
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("productId", sql.Char, req.params.id)
      .query(`DELETE FROM Products WHERE productId = @productId`);

    res.status(200).json(recordset);
  } catch (error) {
    res.status(404).send("No Product Found");
  }
};
