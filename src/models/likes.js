const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Endpoint-- - "api/creators/liked";
// payload-- - { id: creator_id, flag: true | false };
// method-- - post(edited);

const LikesSchema = new Schema(
  {
    creator_id: { type: String },
    flag: { type: Boolean },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
const LikesModel = mongoose.model("Likes", LikesSchema);

module.exports = LikesModel;
