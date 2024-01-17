const User = require("../models/User");
const { ROLES } = require("../util/constants");

/* 
  1. FETCH creator PROFILE BY ID
*/
// {
// cost: 'All' | 'Free' | '<5' | '<10' | '<25' | '>25',
// tags: 'All' | [ 'fdsf', 'fde', ... ],
// likes: 'All' | 'Under 1k' | '1k-5k' | 'Over 5k',
// location: 'All' | string,
// gender: 'All' | 'male' | 'female' | 'unknown',
// }

module.exports.search = async (req, res, next) => {
  const { keyword, params } = req.body;
  console.log("req.body: ", req.body);
  
  const result = await User.find({ role: ROLES.CREATOR });

  res.json(result)
};

async function filterData(payload) {
  let query = {};
  // Filter by cost
  if (payload.cost && payload.cost !== "All") {
    switch (payload.cost) {
      case "Free":
        query.cost = 0;
        break;
      case "<5":
      case "<5.00":
        query.cost = { $lt: 5.0 };
        break;
      case "<10":
      case "<10.00":
        query.cost = { $lt: 10.0 };
        break;
      case "<25":
      case "<25.00":
        query.cost = { $lt: 25.0 };
        break;
      // Add other cases as needed
    }
  }

  // Filter by tags
  if (payload.tags && payload.tags !== "All") {
    query.tags = { $in: Array.isArray(payload.tags) ? payload.tags : [payload.tags] };
  }

  // Filter by likes
  if (payload.likes && payload.likes !== "All") {
    switch (payload.likes) {
      case "Under 1k":
        query.likes = { $lt: 1000 };
        break;
      case "1k-5k":
        query.likes = { $gte: 1000, $lte: 5000 };
        break;
      // Add other cases as needed
    }
  }

  // Filter by location
  if (payload.location && payload.location !== "All") {
    query.location = payload.location;
    // Using Mongoose's $regex operator for a substring search
    query.location = { $regex: new RegExp(payload.location, "i") };
  }

  // Filter by gender
  if (payload.gender && payload.gender !== "All") {
    query.gender = payload.gender;
  }

  // Perform the query using the Mongoose model
  const result = await Creator.find(query);

  // Return the filtered data
  return result;
}
