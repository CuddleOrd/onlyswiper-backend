// Endpoint-- - "api/creators/liked";
// payload-- - { id: creator_id, flag: true | false };
// method-- - post(edited);
const Favorite = require("../../models/Favorite");

module.exports.favorite = async (req, res, next) => {
  // Function to add or remove like based on the flag
  const { creator_id, flag } = req.body;
  console.log(req);
  const user_id = req.userId;
  async function toggleLike(creator_id, flag, user_id) {
    try {
      let query = { user_id };
      let update;
      if (flag == true) {
        update = { $addToSet: { creator_id: creator_id } };
      } else {
        update = { $pull: { creator_id: creator_id } };
      }
      // Use the findOneAndUpdate method to atomically update the document
      const result = await Favorite.findOneAndUpdate(query, update, {
        new: true, // Return the modified document
        upsert: true, // If the document doesn't exist, create it
      });

      console.log(result);
      res.json(result);
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  }
  toggleLike(creator_id, flag, user_id);
};
