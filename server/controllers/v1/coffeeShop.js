const { normalizeSqlQuery } = require("../../utils/query");

exports.getAll = (req, res, next) => {
  req.app.locals.db.query(`SELECT * FROM CoffeeShop`, (error, recordset) => {
    if (error) {
      console.log(error);
      res.status(404).send("No CoffeShop Found");
      return;
    }
    res.status(200).json(recordset.recordset);
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
      console.log(error);
      res.status(404).send("Coffee Shop Not Found");
      return;
    }
    res.status(200).json({ message: "Coffee Shop Update Succesfully" });
  });
};
