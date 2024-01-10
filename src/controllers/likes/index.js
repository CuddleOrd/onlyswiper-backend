// Endpoint-- - "api/creators/liked";
// payload-- - { id: creator_id, flag: true | false };
// method-- - post(edited);
const Likes = require("../../models/likes");

module.exports.likes = async (req, res, next) => {
  console.log(req.body);
  return res.json("likes selected!");
};
