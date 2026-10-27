const { normalizeSqlQuery } = require("../../utils/query");

exports.getAll = (req, res, next) => {
  req.app.locals.db.query(`SELECT * FROM CoffeeShop`, (error, recordset) => {
    if (error) {
      res.status(404).json({ message: "No coffeShop found" });
      return;
    }
    res.status(200).json({ data: recordset.recordset });
  });
};

exports.update = (req, res, next) => {
  const { coffeeShopName, phone, address } = req.body;

  const updateProductQuery = normalizeSqlQuery(`
    UPDATE Products SET 
      coffeeShopName = '${coffeeShopName}',
      phone = '${phone}',
      address = '${address}'
    WHERE productId = '${req.params.id}'`);

  req.app.locals.db.query(updateProductQuery, (error, recordset) => {
    if (error) {
      res.status(404).json({ message: "Coffee Shop not found" });
      return;
    }
    res.status(200).json({ message: "Coffee Shop updated succesfully" });
  });
};
