const jwt = require("jsonwebtoken");
const Member = require("../models/Member");

// Check if user is logged in (Has valid token)
const verifyToken = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database
    const member = await Member.findById(decoded.memberId);
    if (!member) {
      return res.status(401).json({ message: "Account not found" });
    }

    // Attach user to the request object
    req.user = member;
    next(); // Move to the next step
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Check if user is Admin
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next(); // admin --> pass
  } else {
    return res
      .status(403)
      .json({ message: "Access denied. Admin privileges required!" });
  }
};

module.exports = { verifyToken, verifyAdmin };
