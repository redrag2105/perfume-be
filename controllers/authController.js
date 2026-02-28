const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// --- REGISTER ---
exports.register = async (req, res) => {
  try {
    const { email, password, name, YOB, gender } = req.body;

    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const newMember = await Member.create({
      email,
      password: hashPassword,
      name,
      YOB,
      gender,
    });

    res
      .status(201)
      .json({ message: "Registration successful!", member: newMember });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- LOGIN ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET;

    // Find member by email
    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(400).json({ message: "Email not found!" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate Token
    const accessToken = jwt.sign(
      {
        memberId: member._id,
        isAdmin: member.isAdmin,
      },
      jwtSecret,
      { expiresIn: "1h" },
    );

    // Send back token and basic user info
    res.json({
      success: true,
      accessToken,
      user: { email: member.email, name: member.name, isAdmin: member.isAdmin },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
