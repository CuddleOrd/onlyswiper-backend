/* eslint-disable prefer-destructuring */
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { User } from "../models/user.model";
import { GENDERS, USER_ROLES } from "../utils/const.util";

/**
 * Search
 *
 * @param req
 * @param res
 * @param _next
 */
async function search(req: Request, res: Response, next: NextFunction) {
  const { keyword, params } = req.body;

  try {
    const query: Record<string, any> = {
      role: USER_ROLES.CREATOR
    };

    if (keyword) {
      query.name = new RegExp(keyword);
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
            default:
              break;
          }
          break;

        case "Tags":
          if (one.condition.value) {
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
            default:
              break;
          }
          break;

        case "Location":
          if (one.condition.value) {
            query.address = new RegExp(one.condition.value);
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
            default:
              break;
          }
          break;

        default:
          break;
      }
    }

    const result = await User.find(query);

    res.status(httpStatus.OK).json({ success: true, result });
  } catch (error) {
    console.error("creator.controller search error: ", error);
  } finally {
    next();
  }
}

export default {
  search
};
