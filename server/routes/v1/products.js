const express = require("express");
const router = express.Router();
const multer = require("multer");

const productCoverUpload = require("../../utils/multerStorage");

const productController = require("../../controllers/v1/product");

router
  .route("/")
  .post(productCoverUpload.single("cover"), productController.create)
  .get(productController.getAll);

router
  .route("/:id")
  .get(productController.get)
  .put(productCoverUpload.single("cover"), productController.update)
  .delete(productController.remove);

module.exports = router;
