const express = require("express");
const router = express.Router();

const managerController = reuqire("../../controllers/v1/manager");

router.route("/").get(managerController.getAll);
router.route("/:id").put(managerController.update);

module.exports = router;
