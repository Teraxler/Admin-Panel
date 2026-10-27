const { normalizeSqlQuery } = require("../../utils/query");

exports.getAll = (req, res, next) => {
  req.app.locals.db.query(`SELECT * FROM Managers`, (error, recordset) => {
    if (error) {
      console.log(error);
      res.status(404).send("Manager Not Found");
      return;
    }
    res.status(200).json(recordset.recordset);
  });
};

exports.update = (req, res, next) => {
  const { username, name, family, email, password } = req.body;

  const updateProductQuery = normalizeSqlQuery(`
    UPDATE Managers SET 
    username = '${username}',
      name = '${name}',
      family = '${family}',
      email = '${email}',
      password = '${password}'
    WHERE managerId = '${req.params.id}'
    `);

  req.app.locals.db.query(updateProductQuery, (error, recordset) => {
    if (error) {
      console.log(error);
      res.status(404).send("No Manager Found");
      return;
    }
    res.status(200).json(recordset.recordset);
  });
};
