const Brand = require("../models/Brand"); // Using your exact file name!

// --- GET ALL BRANDS ---
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- CREATE BRAND ---
exports.createBrand = async (req, res) => {
  try {
    const { brandName } = req.body;
    const newBrand = await Brand.create({ brandName });
    res
      .status(201)
      .json({ message: "Brand created successfully!", brand: newBrand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- UPDATE BRAND ---
exports.updateBrand = async (req, res) => {
  try {
    const { brandName } = req.body;
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      { brandName },
      { new: true },
    );
    if (!updatedBrand)
      return res.status(404).json({ message: "Brand not found!" });
    res.json({ message: "Brand updated!", brand: updatedBrand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- DELETE BRAND ---
exports.deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand)
      return res.status(404).json({ message: "Brand not found!" });
    res.json({ message: "Brand deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
