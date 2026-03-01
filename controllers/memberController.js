const Member = require("../models/Member");
const bcrypt = require("bcrypt");

// --- UPDATE PROFILE ---
exports.updateProfile = async (req, res) => {
  try {
    // Get user ID from the verified token, NOT from URL
    const memberId = req.user._id;
    const { name, YOB, gender } = req.body;

    // Update member (exclude email, password, and isAdmin)
    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      { name, YOB, gender },
      { returnDocument: "after", runValidators: true },
    ).select("-password"); // Don't send back password

    res.json({
      message: "Profile updated successfully!",
      member: updatedMember,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- CHANGE PASSWORD ---
exports.changePassword = async (req, res) => {
  try {
    const memberId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    const member = await Member.findById(memberId);

    const isMatch = await bcrypt.compare(oldPassword, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password!" });
    }

    // Hash new pass and save
    member.password = await bcrypt.hash(newPassword, 8);
    await member.save();

    res.json({ message: "Password changed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- GET CURRENT PROFILE ---
exports.getProfile = async (req, res) => {
  try {
    const member = await Member.findById(req.user._id).select("-password");
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
