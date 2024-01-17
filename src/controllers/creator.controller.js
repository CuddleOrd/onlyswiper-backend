const User = require("../models/User");
const { ROLES, GENDERS } = require("../util/constants");

module.exports.search = async (req, res, next) => {
  const { keyword, params } = req.body;
  
  let query = {
    role: ROLES.CREATOR
  };

  if (!!keyword) {
    query.name = new RegExp(keyword)
  }

  for (let i = 0; i < params.length; i++) {
    const one = params[i];

    switch (one.category) {
      case "Cost":
        switch (one.condition.value) {
          case "all":
            break;
          case "free":
            query.cost = 0;
            break;
          case "<5":
            query.cost = { $lte: 5 };
            break;
          case "<10":
            query.cost = { $lte: 10 };
            break;
          case "<25":
            query.cost = { $lte: 25 };
            break;
          case ">25":
            query.cost = { $gte: 25 };
            break;
        }
        break;

      case "Tags":
        if(!!one.condition.value) {
          query.characteristics = { $in: [one.condition.value] };
        }
        break;
      
      case "Likes":
        switch (one.condition.value) {
          case "all":
            break;
          case "<1k":
            query.likes = { $lte: 1000 };
            break;
          case "<5k":
            query.likes = { $lte: 5000 };
            break;
          case ">5k":
            query.likes = { $gte: 5000 };
            break;
        }
        break;
      
      case "Location":
        if (!!one.condition.value) {
          query.address = new RegExp(one.condition.value)
        }
        break;
      
      case "Gender":
        switch (one.condition.value) {
          case "all":
            break;
          case "Male":
            query.gender = GENDERS[0];
            break;
          case "Female":
            query.gender = GENDERS[1];
            break;
          case "Unknown":
            query.gender = GENDERS[2];
            break;
        }
        break;
    }
  }
  
  const result = await User.find(query);

  res.json(result)
};