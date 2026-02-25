const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    YOB: { type: Number },
    gender: { type: Boolean },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Members", memberSchema);
