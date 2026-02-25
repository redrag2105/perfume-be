const express = require("express");
const router = express.Router();
const perfumeController = require("../controllers/perfumeController");

// Import middlewares
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// --- PUBLIC ROUTES (Task 1) ---
router.get("/", perfumeController.getPerfumes);
router.get("/:id", perfumeController.getPerfumeById);

// --- ADMIN ROUTES (Task 2) ---
router.post("/", verifyToken, verifyAdmin, perfumeController.createPerfume);
router.put("/:id", verifyToken, verifyAdmin, perfumeController.updatePerfume);
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  perfumeController.deletePerfume,
);

// --- MEMBER ROUTES (Task 3) ---
// Notice: We only use verifyToken here. Any logged-in member can comment!
router.post("/:id/comments", verifyToken, perfumeController.addComment);

module.exports = router;
