const express = require("express");
const controller = require("../controllers/stock.controller");
const errorWrapperAsync = require("../utils/exception/error.wrapper");

const router = express.Router();

router.get("/:id", errorWrapperAsync(controller.getById))
router.get("/", errorWrapperAsync(controller.getList))
router.post("/", errorWrapperAsync(controller.create))
router.put("/:id", errorWrapperAsync(controller.update))
router.patch("/:id/price", errorWrapperAsync(controller.updatePrice))
router.delete("/:id", errorWrapperAsync(controller.passiveDelete))


module.exports = router;