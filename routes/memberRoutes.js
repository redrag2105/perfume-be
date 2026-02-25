const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const { verifyToken } = require("../middleware/authMiddleware");

// Route: PUT /api/members/profile (Requires Login)
router.put("/profile", verifyToken, memberController.updateProfile);

// Route: PUT /api/members/password (Requires Login)
router.put("/password", verifyToken, memberController.changePassword);

router.get("/profile", verifyToken, memberController.getProfile);

module.exports = router;
