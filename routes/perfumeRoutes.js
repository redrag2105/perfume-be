const express = require("express");
const router = express.Router();
const perfumeController = require("../controllers/perfumeController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// --- PUBLIC ROUTES ---
router.get("/", perfumeController.getPerfumes);
router.get("/:id", perfumeController.getPerfumeById);

// --- ADMIN ROUTES ---
router.post("/", verifyToken, verifyAdmin, perfumeController.createPerfume);
router.put("/:id", verifyToken, verifyAdmin, perfumeController.updatePerfume);
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  perfumeController.deletePerfume,
);

// --- MEMBER ROUTES ---
router.post("/:id/comments", verifyToken, perfumeController.addComment);

module.exports = router;
