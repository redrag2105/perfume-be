const express = require("express");
const router = express.Router();
const collectorController = require("../controllers/collectorController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Route: GET /api/collectors (Requires Login AND Admin)
router.get("/", verifyToken, verifyAdmin, collectorController.getAllMembers);

// Route: GET /api/collectors/stats (Requires Login AND Admin) - Dashboard stats
router.get(
  "/stats",
  verifyToken,
  verifyAdmin,
  collectorController.getDashboardStats,
);

module.exports = router;
