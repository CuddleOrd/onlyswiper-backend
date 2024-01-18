const User = require("../models/User");
const Favorite = require("../models/Favorite");

module.exports.get = async (req, res, next) => {
  const user_id = req.userId;

  try {
    const favorite = await Favorite.findOne({ user_id });
    const result = await User.find({ _id: { $in: favorite.creator_id }})
    res.json(result);
  } catch (error) {
    console.error("Error favorite:", error);
    next(error);
  }
};

module.exports.like = async (req, res, next) => {
  const { creator_id } = req.body;
  const user_id = req.userId;

  try {
    let update = { $addToSet: { creator_id: creator_id } };
    
    const result = await Favorite.findOneAndUpdate({ user_id }, update, {
      new: true,
      upsert: true,
    });

    res.json(result);
  } catch (error) {
    console.error("Error favorite:", error);
    next(error);
  }
};

module.exports.dislike = async (req, res, next) => {
  const { creator_id } = req.body;
  const user_id = req.userId;

  try {
    let update = { $pull: { creator_id: creator_id } };
    
    const result = await Favorite.findOneAndUpdate({ user_id }, update, {
      new: true,
      upsert: true,
    });

    res.json(result);
  } catch (error) {
    console.error("Error favorite:", error);
    next(error);
  }
};