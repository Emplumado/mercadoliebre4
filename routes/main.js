// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const mainController = require("../controllers/mainController");

router.get("/", mainController.index); /* GET - home page */
router.get("/results", mainController.search); /* GET - search results */
router.get("/offers", mainController.offers);  /* GET - offers */

module.exports = router;