const express = require("express");
const router = express.Router();
const userController = require("../../controllers/v2/user");

router.route("/").get(userController.getAll);

router
  .route("/:id")
  .get(userController.get)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
