const express = require("express");
const controller = require("../controllers/user.controller");
const errorWrapperAsync = require("../utils/exception/error.wrapper");


const router = express.Router();

router.get("/:id", errorWrapperAsync(controller.getById))
router.get("/", errorWrapperAsync(controller.getList))
router.post("/register", errorWrapperAsync(controller.create))
router.put("/:id", errorWrapperAsync(controller.update))
router.delete("/:id", errorWrapperAsync(controller.passiveDelete))
router.patch("/:id/password", errorWrapperAsync(controller.changePassword))


module.exports = router;