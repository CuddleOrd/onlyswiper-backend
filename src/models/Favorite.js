const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const FavoriteSchema = new Schema(
  {
    user_id: { type: String },
    creator_id: [{ type: String }],
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);

module.exports = FavoriteModel;
