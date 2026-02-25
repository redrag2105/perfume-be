const Perfume = require("../models/Perfume");
const Brand = require("../models/Brand");
const Member = require("../models/Member");

// --- GET ALL PERFUMES (Search & Filter with Pagination) ---
exports.getPerfumes = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { search, brandName, page = 1, limit = 12 } = req.query; // Get search queries from URL
    let query = {};

    // 1. Search by Perfume Name (case-insensitive)
    if (search) {
      query.perfumeName = { $regex: search, $options: "i" };
    }

    // 2. Filter by Brand Name
    if (brandName) {
      // Find the brands that match the name
      const brands = await Brand.find({
        brandName: { $regex: brandName, $options: "i" },
      });
      const brandIds = brands.map((b) => b._id); // Extract their ObjectIds
      query.brand = { $in: brandIds }; // Add to our perfume search query
    }

    // 3. Calculate pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    // 4. Get total count for pagination info
    const totalCount = await Perfume.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limitNum);

    // 5. Fetch perfumes from DB with pagination and populate the brand
    const perfumes = await Perfume.find(query)
      .populate("brand", "brandName") // Mongoose Population requirement!
      .select("perfumeName uri targetAudience brand concentration price") // Include price
      .skip(skip)
      .limit(limitNum)
      .sort({ perfumeName: 1 }); // Alphabetical order

    // 6. Format the output (removed duplicate 'image' field, using only 'uri')
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

    // 7. Return with pagination metadata
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
    // Fetch all details, populate brand, and populate the comment authors' names
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

// --- CREATE PERFUME (Admin Only) ---
exports.createPerfume = async (req, res) => {
  try {
    // We expect all these fields from the request body
    const newPerfume = await Perfume.create(req.body);
    res
      .status(201)
      .json({ message: "Perfume created successfully!", perfume: newPerfume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- UPDATE PERFUME (Admin Only) ---
exports.updatePerfume = async (req, res) => {
  try {
    const updatedPerfume = await Perfume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedPerfume)
      return res.status(404).json({ message: "Perfume not found!" });
    res.json({ message: "Perfume updated!", perfume: updatedPerfume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- DELETE PERFUME (Admin Only) ---
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

// --- ADD A COMMENT (Member Only, Once per perfume) ---
exports.addComment = async (req, res) => {
  try {
    const perfumeId = req.params.id; // The perfume they are commenting on
    const memberId = req.user._id; // The logged-in user
    const { rating, content } = req.body;

    // 1. Find the perfume
    const perfume = await Perfume.findById(perfumeId);
    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found!" });
    }

    // 2. Check if this member has ALREADY commented on this specific perfume
    // We convert ObjectIds to strings to safely compare them
    const hasCommented = perfume.comments.some(
      (comment) => comment.author.toString() === memberId.toString(),
    );

    if (hasCommented) {
      return res.status(400).json({
        message:
          "You have already reviewed this perfume. You can only feedback once!",
      });
    }

    // 3. Add the comment
    perfume.comments.push({
      rating,
      content,
      author: memberId,
    });

    // 4. Save the updated perfume
    await perfume.save();

    res
      .status(201)
      .json({ message: "Feedback submitted successfully!", perfume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
