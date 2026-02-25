const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// --- REGISTER METHOD ---
exports.register = async (req, res) => {
  try {
    // 1. Get user data from the request body
    const { email, password, name, YOB, gender } = req.body;

    // 2. Check if the email is already registered
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // 3. Hash the password using bcrypt (Requirement from assignment)
    const hashPassword = await bcrypt.hash(password, 8);

    // 4. Create the new member
    // Notice we do NOT pass isAdmin here, so it defaults to false (Requirement)
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

// --- LOGIN METHOD ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET;

    // 1. Find the member by email
    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(400).json({ message: "Email not found!" });
    }

    // 2. Compare the entered password with the hashed database password
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // 3. Generate a JWT Token
    // We store the memberId and isAdmin status inside the token for easy access later
    const accessToken = jwt.sign(
      {
        memberId: member._id,
        isAdmin: member.isAdmin,
      },
      jwtSecret,
      { expiresIn: "1h" },
    );

    // 4. Send back the token and basic user info
    res.json({
      success: true,
      accessToken,
      user: { email: member.email, name: member.name, isAdmin: member.isAdmin },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
