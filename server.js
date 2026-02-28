const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const perfumeRoutes = require("./routes/perfumeRoutes");
const brandRoutes = require("./routes/brandRoutes");
const collectorRoutes = require("./routes/collectorRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/perfumes", perfumeRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/collectors", collectorRoutes);
// -----------------------

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
