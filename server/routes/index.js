const express = require("express");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.use(require("./auth"));
router.use(authentication);
router.use(require("./cuisine"));

module.exports = router;
