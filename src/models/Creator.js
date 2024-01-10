const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/* 
1. CREATE Creator SCHEMA
 */

const GENDERS = ["M", "F"];
const CreatorSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    tags: [String],
    likes: { type: Number },
    location: { type: String },
    gender: { type: String, enum: GENDERS },
    description: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
const CreatorModel = mongoose.model("Creator", CreatorSchema);

module.exports = CreatorModel;
