const Perfume = require("../models/Perfume");
const Brand = require("../models/Brand");
const Member = require("../models/Member");

// --- GET ALL PERFUMES ---
exports.getPerfumes = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { search, brandName, page = 1, limit = 12 } = req.query;
    let query = {};

    // Search by Perfume Name
    if (search) {
      query.perfumeName = { $regex: search, $options: "i" };
    }

    // Filter by Brand Name
    if (brandName) {
      const brands = await Brand.find({
        brandName: { $regex: brandName, $options: "i" },
      });
      const brandIds = brands.map((b) => b._id); // Extract their ObjectIds
      query.brand = { $in: brandIds }; // Add to perfume search query
    }

    // Calculate pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination info
    const totalCount = await Perfume.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limitNum);

    // Fetch perfumes from DB with pagination and populate the brand
    const perfumes = await Perfume.find(query)
      .populate("brand", "brandName")
      .select("perfumeName uri targetAudience brand concentration price")
      .skip(skip)
      .limit(limitNum)
      .sort({ perfumeName: 1 });

    const formattedPerfumes = perfumes.map((p) => ({
      _id: p._id,
      perfumeName: p.perfumeName,
      uri: p.uri,
      targetAudience: p.targetAudience,
      brandName: p.brand ? p.brand.brandName : "Unknown Brand",
      brand: p.brand,
      concentration: p.concentration,
      price: p.price,
    }));

    res.json({
      perfumes: formattedPerfumes,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- GET PERFUME DETAILS ---
exports.getPerfumeById = async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id)
      .populate("brand", "brandName")
      .populate("comments.author", "name");

    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found!" });
    }

    res.json(perfume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====== ADMIN ======
// --- CREATE PERFUME ---
exports.createPerfume = async (req, res) => {
  try {
    const newPerfume = await Perfume.create(req.body);
    res
      .status(201)
      .json({ message: "Perfume created successfully!", perfume: newPerfume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- UPDATE PERFUME ---
exports.updatePerfume = async (req, res) => {
  try {
    const updatedPerfume = await Perfume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedPerfume)
      return res.status(404).json({ message: "Perfume not found!" });
    res.json({ message: "Perfume updated!", perfume: updatedPerfume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- DELETE PERFUME ---
exports.deletePerfume = async (req, res) => {
  try {
    const deletedPerfume = await Perfume.findByIdAndDelete(req.params.id);
    if (!deletedPerfume)
      return res.status(404).json({ message: "Perfume not found!" });
    res.json({ message: "Perfume deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====== MEMBER ======
// --- ADD A COMMENT ---
exports.addComment = async (req, res) => {
  try {
    const perfumeId = req.params.id;
    const memberId = req.user._id;
    const { rating, content } = req.body;

    const perfume = await Perfume.findById(perfumeId);
    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found!" });
    }

    // Check if this member has ALREADY commented on this specific perfume
    const hasCommented = perfume.comments.some(
      (comment) => comment.author.toString() === memberId.toString(),
    );

    if (hasCommented) {
      return res.status(400).json({
        message:
          "You have already reviewed this perfume. You can only feedback once!",
      });
    }

    perfume.comments.push({
      rating,
      content,
      author: memberId,
    });

    await perfume.save();

    res
      .status(201)
      .json({ message: "Feedback submitted successfully!", perfume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
