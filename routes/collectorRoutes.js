const express = require("express");
const router = express.Router();
const collectorController = require("../controllers/collectorController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// verifyToken FIRST, then verifyAdmin
// GET /api/collectors
router.get("/", verifyToken, verifyAdmin, collectorController.getAllMembers);

// GET /api/collectors/stats - Dashboard stats for admin
router.get(
  "/stats",
  verifyToken,
  verifyAdmin,
  collectorController.getDashboardStats,
);

module.exports = router;
