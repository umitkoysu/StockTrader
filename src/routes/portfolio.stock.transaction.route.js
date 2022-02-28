const express = require("express");
const controller = require("../controllers/portfolio.stock.transaction.controller");
const errorWrapperAsync = require("../utils/exception/error.wrapper");


const router = express.Router();

router.get("/", errorWrapperAsync(controller.getList))


module.exports = router;