const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const { registerUser , loginUser , getProfile, updateProfile,getUserById } = require("../controllers/userController");

router.get("/",(req,res) => {
    res.json({Message:"user router working"});
});

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getProfile);
router.get("/:id",getUserById);
router.put("/profile/:id",updateProfile);

module.exports = router;