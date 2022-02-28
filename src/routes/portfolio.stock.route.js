const express = require("express");
const controller = require("../controllers/portfolio.stock.controller");
const errorWrapperAsync = require("../utils/exception/error.wrapper");

const router = express.Router();

router.get("/:id", errorWrapperAsync(controller.getById))
router.get("/", errorWrapperAsync(controller.getList))
router.post("/buy", errorWrapperAsync(controller.buyStock))
router.post("/sell", errorWrapperAsync(controller.sellStock))


module.exports = router;