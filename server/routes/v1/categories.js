const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/v1/category");

router
  .route("/")
  .post(categoryController.create)
  .get(categoryController.getAll);
router
  .route("/:id")
  .get(categoryController.get)
  .put(categoryController.update)
  .delete(categoryController.remove);

module.exports = router;
