const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// GET /api/brands
router.get("/", brandController.getBrands);

// verifyToken FIRST, then verifyAdmin
// POST /api/brands
router.post("/", verifyToken, verifyAdmin, brandController.createBrand);

// PUT /api/brands/:id
router.put("/:id", verifyToken, verifyAdmin, brandController.updateBrand);

// DELETE /api/brands/:id
router.delete("/:id", verifyToken, verifyAdmin, brandController.deleteBrand);

module.exports = router;
