const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

// Import your middlewares
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Notice how we put verifyToken FIRST, then verifyAdmin!
// Route: GET /api/brands
router.get("/", verifyToken, verifyAdmin, brandController.getBrands);

// Route: POST /api/brands
router.post("/", verifyToken, verifyAdmin, brandController.createBrand);

// Route: PUT /api/brands/:id
router.put("/:id", verifyToken, verifyAdmin, brandController.updateBrand);

// Route: DELETE /api/brands/:id
router.delete("/:id", verifyToken, verifyAdmin, brandController.deleteBrand);

module.exports = router;
