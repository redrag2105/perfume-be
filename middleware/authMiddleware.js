const jwt = require("jsonwebtoken");
const Member = require("../models/Member");

// 1. Check if the user is logged in (Has valid token)
const verifyToken = async (req, res, next) => {
  try {
    // Get token from headers: "Authorization: Bearer <token>"
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

    // Attach the user to the request object so the next functions can use it
    req.user = member;
    next(); // Move to the next step
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// 2. Check if the user is an Admin
const verifyAdmin = (req, res, next) => {
  // We check req.user which was attached by the verifyToken function above
  if (req.user && req.user.isAdmin === true) {
    next(); // They are admin, let them pass
  } else {
    return res
      .status(403)
      .json({ message: "Access denied. Admin privileges required!" });
  }
};

module.exports = { verifyToken, verifyAdmin };
