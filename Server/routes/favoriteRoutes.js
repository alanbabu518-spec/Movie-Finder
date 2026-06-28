const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addFavorite, getFavorite, removeFavorite } = require("../controllers/favoriteController");

router.post("/", protect, addFavorite);
router.get("/", protect, getFavorite);
router.delete("/:id", protect, removeFavorite);

module.exports = router;
