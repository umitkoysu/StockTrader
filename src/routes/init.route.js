const express = require("express");
const userRouter = require("./user.route");
const stockRouter = require("./stock.route")
const stockTransactionRouter = require("./stock.transaction.route")
const tradeTypeRouter = require("./trade.type.route")
const portfolioRouter = require("./portfolio.route")
const portfolioStpckRouter = require("./portfolio.stock.route")
const portfolioStockTransactionRouter = require("./portfolio.stock.transaction.route") 

const router = express.Router();

router.use("/trade-type", tradeTypeRouter);
router.use("/user", userRouter);
router.use("/stock", stockRouter);
router.use("/stock-transaction", stockTransactionRouter);
router.use("/portfolio", portfolioRouter);
router.use("/portfolio-stock", portfolioStpckRouter);
router.use("/portfolio-stock-transaction", portfolioStockTransactionRouter);

module.exports = router;



