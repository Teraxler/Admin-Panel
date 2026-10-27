const { idGenerator } = require("../../utils/query");
const sql = require("mssql");

exports.create = async (req, res, next) => {
  try {
    const {
      customerId,
      deliveredAddress = "Birjand, Azad University",
      discountPercent = 0,
      products,
    } = req.body;

    const orderId = idGenerator(10);

    await req.app.locals.db
      .request()
      .input("orderId", sql.Char, orderId)
      .input("customerId", sql.Char, customerId)
      .input("status", sql.VarChar, "in progress")
      .input("deliveredAddress", sql.VarChar, deliveredAddress)
      .input("discountPercent", sql.TinyInt, discountPercent)
      .query(`INSERT INTO Orders (orderId, customerId, status, deliveredAddress, discountPercent)
              VALUES (  
                @orderId, 
                @customerId, 
                @status, 
                @deliveredAddress, 
                @discountPercent
              )`);

    await req.app.locals.db.request().input("orderId", sql.Char, orderId)
      .query(`INSERT INTO OrderItems (productId, orderId, quantity, unitPrice)
          VALUES 
            ${products.map(
              (product) =>
                `(
                  '${product.productId}',
                  @orderId,
                  '${product.count}',
                  '${product.price}'
                )`
            )}
      `);

    res.status(202).json({ message: "Order Created Succesfully" });
  } catch (error) {
    console.log("Create Order Error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.get = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("orderId", sql.Char, req.params.id)
      .query(
        `
        SELECT C.name, C.family, C.email, O.orderId, O.createdAt, O.deliveredAddress, O.discountPercent, O.status, OI.unitPrice, OI.quantity
        FROM Orders O, OrderItems OI, Customers C
        WHERE O.orderId = O.orderId AND O.orderId = @orderId AND C.customerId = O.customerId
      `
      );

    res.status(200).send(recordset[0]);
  } catch (error) {
    console.log("Order Get Error:", error);
    res.status(500).send("SERVER ERROR");
  }
};

exports.getAll = (req, res, next) => {
  req.app.locals.db.query(
    `
      SELECT O.orderId, O.status, O.deliveredAddress, O.createdAt, O.discountPercent,
      SUM(OI.quantity) AS itemCount, 
      SUM(OI.unitPrice * OI.quantity) AS totalPrice,
      C.customerId, C.name AS customerName, C.family AS customerFamily, C.email AS customerEmail
      FROM ORDERS O
      LEFT JOIN OrderItems OI ON OI.orderId = O.orderId
      LEFT JOIN Customers C ON C.customerId = O.customerId
      GROUP BY O.orderId, O.status, O.deliveredAddress, O.createdAt, O.discountPercent, C.customerId, C.name, C.family, C.email ORDER BY O.createdAt;
    `,
    (error, recordset) => {
      if (error) {
        res.status(500).send("SERVER ERROR");
        return;
      }

      res.status(200).json(recordset.recordset);
    }
  );
};

exports.update = async (req, res, next) => {
  try {
    await req.app.locals.db
      .request()
      .input("status", sql.VarChar, req.body.status)
      .input("orderId", sql.Char, req.params.id)
      .query(
        `
        UPDATE Orders SET
          status = @status
        WHERE orderId = @orderId
        `
      );

    res.status(200).json({ message: "Order Succesfully Update" });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

exports.remove = async (req, res, next) => {
  try {
    await req.app.locals.db
      .request()
      .input("orderId", sql.Char.req.params.id)
      .query(`DELETE FROM Orders WHERE orderId = @orderId`);

    res.status(200).send({ message: "Order Succesfully Delete" });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};
