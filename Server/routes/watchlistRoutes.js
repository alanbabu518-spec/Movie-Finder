const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addWatchlist, getWatchlist, removeWatchlist } = require("../controllers/watchlistController");

router.post("/", protect, addWatchlist);
router.get("/", protect, getWatchlist);
router.delete("/:id", protect, removeWatchlist);

module.exports = router;
