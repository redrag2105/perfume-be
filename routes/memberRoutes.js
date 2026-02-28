const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const { verifyToken } = require("../middleware/authMiddleware");

// === LOGIN REQUIRED ===
// PUT /api/members/profile
router.put("/profile", verifyToken, memberController.updateProfile);

// PUT /api/members/password
router.put("/password", verifyToken, memberController.changePassword);

router.get("/profile", verifyToken, memberController.getProfile);

module.exports = router;
