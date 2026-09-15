const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/v1/order");

router.route("/").post(orderController.create).get(orderController.getAll);

router
  .route("/:id")
  .get(orderController.get)
  .put(orderController.update)
  .delete(orderController.remove);

module.exports = router;
