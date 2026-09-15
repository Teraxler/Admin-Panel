const sql = require("mssql");

function normalizeSqlQuery(query) {
  return query
    .replaceAll(`"`, `'`)
    .replaceAll(`''`, `'`)
    .replaceAll(`'null'`, null)
    .replaceAll(`'undefined'`, null);
}

const idGenerator = (limit) => crypto.randomUUID().slice(36 - limit, 36);

module.exports = {
  normalizeSqlQuery,
  idGenerator,
};
