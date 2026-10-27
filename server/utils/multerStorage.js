const multer = require("multer");
const path = require("path");

const productCoverStorage = multer.diskStorage({
  destination: "uploads/images/products/",
  filename: (req, file, callback) =>
    callback(null, crypto.randomUUID() + path.extname(file.originalname)),
});

module.exports = productCoverUpload = multer({ storage: productCoverStorage });
