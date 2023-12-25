const express = require("express");
const Controller = require("../controllers/controllers");
const authorization = require("../middlewares/authorization");
const router = express.Router();
router.post("/cuisines", Controller.addCuisine);
router.get("/cuisines", Controller.cuisine);
router.get("/categories", Controller.categories);

router.get("/cuisines/:id", Controller.cuisineById);
router.delete("/cuisines/:id", authorization, Controller.deleteCuisine);

module.exports = router;
