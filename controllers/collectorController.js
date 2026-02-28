const Member = require("../models/Member");
const Brand = require("../models/Brand");
const Perfume = require("../models/Perfume");

// ====== ADMIN ======
// --- GET ALL MEMBERS ---
exports.getAllMembers = async (req, res) => {
  try {
    // Fetch all members but exclude their passwords for security
    const members = await Member.find().select("-password");
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- GET DASHBOARD STATS  ---
exports.getDashboardStats = async (req, res) => {
  try {
    // Get counts in parallel for better performance
    const [membersCount, brandsCount, perfumesCount, activeClientsCount] =
      await Promise.all([
        Member.countDocuments(),
        Brand.countDocuments(),
        Perfume.countDocuments(),
        Member.countDocuments({ isAdmin: false }),
      ]);

    res.json({
      membersCount,
      brandsCount,
      perfumesCount,
      activeClientsCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
