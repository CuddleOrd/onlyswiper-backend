const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/* 
1. CREATE Creator SCHEMA
 */

const GENDERS = ["M", "F", "U"];
const CreatorSchema = new Schema(
  {
    avatar: { type: String },
    name: { type: String },
    gender: { type: String, enum: GENDERS },
    age: {type: Number},
    location: { type: String },

    tags: [String],
    
    cost: { type: Number },
    likes: { type: Number },
    
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
