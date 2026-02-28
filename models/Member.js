const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for OAuth users
    name: { type: String, required: true },
    YOB: { type: Number },
    gender: { type: Boolean },
    isAdmin: { type: Boolean, default: false },
    googleId: { type: String, unique: true, sparse: true }, // For Google OAuth
  },
  { timestamps: true },
);

module.exports = mongoose.model("Members", memberSchema);
