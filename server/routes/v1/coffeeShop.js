const express = require("express");
const router = express.Router();
const coffeeShopController = require("../../controllers/v1/coffeeShop");

router.route("/").get(coffeeShopController.getAll);
router.route("/:id").put(coffeeShopController.update);

module.exports = router;
