const express = require("express");
const router = express.Router();
const coffeeShopController = require("../../controllers/v2/coffee-shop");

router.route("/").get(coffeeShopController.getAll);

module.exports = router;
