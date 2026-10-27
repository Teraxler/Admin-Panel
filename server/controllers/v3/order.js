const { idGenerator } = require("../../utils/query");
const sql = require("mssql");

exports.create = async (req, res, next) => {
  const transaction = new sql.Transaction(req.app.locals.db);

  const {
    userId,
    deliveredAddress = "Iran, Birjand",
    discountPercent = 0,
    products,
  } = req.body;

  try {
    await transaction.begin();

    const request = new sql.Request(transaction);

    const orderId = idGenerator(10);
    const ordersTable = new sql.Table("Orders");

    ordersTable.columns.add("orderId", sql.Char(10), { nullable: false });
    ordersTable.columns.add("userId", sql.Char(10));
    ordersTable.columns.add("status", sql.VarChar(15), { nullable: false });
    ordersTable.columns.add("discountPercent", sql.TinyInt, {
      nullable: false,
    });
    ordersTable.columns.add("deliveredAddress", sql.VarChar(sql.MAX), {
      nullable: false,
    });

    ordersTable.rows.add(
      orderId,
      userId,
      "in progress",
      discountPercent,
      deliveredAddress,
    );

    const orderItemsTable = new sql.Table("OrderItems");

    orderItemsTable.columns.add("orderItemId", sql.Char(10), {
      nullable: false,
    });
    orderItemsTable.columns.add("orderId", sql.Char(10));
    orderItemsTable.columns.add("productId", sql.Char(10));
    orderItemsTable.columns.add("quantity", sql.SmallInt, { nullable: false });
    orderItemsTable.columns.add("unitPrice", sql.SmallMoney, {
      nullable: false,
    });

    products.forEach((product) => {
      const orderItemId = idGenerator(10);

      orderItemsTable.rows.add(
        orderItemId,
        orderId,
        product.productId,
        product.count,
        product.price,
      );
    });

    await request.bulk(ordersTable);
    await request.bulk(orderItemsTable);

    await transaction.commit();

    res.status(202).json({ message: "Order created succesfully" });
  } catch (error) {
    await transaction.rollback();

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.get = async (req, res, next) => {
  try {
    const { recordset } = await req.app.locals.db
      .request()
      .input("orderId", sql.Char, req.params.id)
      .query(
        `
        SELECT (
          SELECT U.userId, U.name AS userName, U.family AS userFamily, U.username AS userUsername, U.email AS userEmail, U.phone AS userPhone, O.orderId, O.createdAt, O.deliveredAddress, O.discountPercent, O.status,
          JSON_QUERY(
            (
              SELECT OI.orderItemId, OI.unitPrice, OI.quantity, P.productId AS productId, P.name AS productName, P.cover AS productCover
              FROM OrderItems OI
              JOIN Products P ON P.productId = OI.productId
              WHERE OI.orderId = @orderId
              FOR JSON PATH
            )
          ) AS orderItems
          FROM Users U
          JOIN Orders O ON O.userId = U.userId
          WHERE O.orderId = @orderId
          FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ) AS result
        `,
      );

    result = {
      userName: "",
      userFamily: "",
      userEmail: "",
      orderId: "",
      createdAt: "",
      deliveredAddress: "",
      discountPercent: 0,
      status: "",
      unitPrice: 16,
      quantity: 1,
      orderItems: [
        {
          orderItemId: "",
          quantity: 3,
          unitPrice: 18,
          productName: "",
          productCover: "",
        },
      ],
    };

    res.status(200).json({ data: recordset[0].result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAll = (req, res, next) => {
  req.app.locals.db.query(
    `
      SELECT O.orderId, O.status, O.deliveredAddress, O.createdAt, O.discountPercent,
      SUM(OI.quantity) AS itemCount, 
      SUM(OI.unitPrice * OI.quantity) AS totalPrice,
      U.userId, U.name AS userName, U.family AS userFamily, U.email AS userEmail
      FROM ORDERS O
      LEFT JOIN OrderItems OI ON OI.orderId = O.orderId
      LEFT JOIN Users U ON U.userId = O.userId
      GROUP BY O.orderId, O.status, O.deliveredAddress, O.createdAt, O.discountPercent, U.userId, U.name, U.family, U.email ORDER BY O.createdAt;
    `,
    (error, recordset) => {
      if (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      res.status(200).json({ data: recordset.recordset });
    },
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
        `,
      );

    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.remove = async (req, res, next) => {
  try {
    await req.app.locals.db
      .request()
      .input("orderId", sql.Char, req.params.id)
      .query(`DELETE FROM Orders WHERE orderId = @orderId`);

    res.status(200).send({ message: "Order deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
