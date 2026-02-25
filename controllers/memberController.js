const Member = require("../models/Member");
const bcrypt = require("bcrypt");

// --- UPDATE PROFILE ---
exports.updateProfile = async (req, res) => {
  try {
    // We get the user ID from the verified token, NOT from the URL.
    // This perfectly satisfies the rule: "Restricted to their own account"
    const memberId = req.user._id;
    const { name, YOB, gender } = req.body;

    // Update the member. We intentionally exclude email, password, and isAdmin here.
    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      { name, YOB, gender },
      { new: true, runValidators: true }, // Return the updated document
    ).select("-password"); // Don't send the password back in the response

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

    // 1. Find the member
    const member = await Member.findById(memberId);

    // 2. Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password!" });
    }

    // 3. Hash the new password and save it
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
    // req.user._id comes from your verifyToken middleware
    const member = await Member.findById(req.user._id).select("-password");
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
