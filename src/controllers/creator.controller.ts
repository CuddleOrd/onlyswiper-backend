/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
import { fakerEN_US as faker } from "@faker-js/faker";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import moment from 'moment';

import { User } from "../models/user.model";
import { GENDERS, USER_ROLES, USER_STATUS } from "../utils/const.util";
import { Favorite } from "../models/favorite.model";

/**
 * Search
 *
 * @param req
 * @param res
 * @param _next
 **/



async function fetchUser(req: Request, res: Response, next: NextFunction) {

  try {
    
    if (!req.user) {
      return;
      
    }
    const { _id: userId } = req.user;

    const user = await User.findById(userId);
    return res
      .status(200)
      .json({ success: true, msg: "User details" , user:user});
  }catch (error) {
    console.error("favorite.controller dislike error: ", error);
    // return res
    //   .status(500)
    //   .json({ success: true, msg: "Error saving" });
  } finally {
    next();
  }
}
async function search(req: Request, res: Response, next: NextFunction) {
  const { keyword, includeFavorite, pagination, params } = req.body;

  console.log(req.body);

  try {
    const query: Record<string, any> = {
      role: USER_ROLES.CREATOR
    };

    if (keyword) {
      query.name = new RegExp(keyword);
    }

    if (!includeFavorite) {
      if (req.user) {
        const { _id: userId } = req.user;

        const favorite = await Favorite.findOne({ userId });
        let favoriteIds = await User.find({
          _id: { $in: favorite?.creatorId }
        }).select("_id");
        favoriteIds = favoriteIds.map((item: any) => item._id);
        query._id = { $nin: favoriteIds };
      }
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

        case "Gender1":
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

        case "Pictures":
          switch (one.condition.value) {
            case "all":
              break;
            case "<100":
              query.pictures = { $lte: 100 };
              break;
            case "<500":
              query.pictures = { $lte: 500 };
              break;
            case "<1k":
              query.pictures = { $lte: 1000 };
              break;
            case ">1k":
              query.pictures = { $gte: 1000 };
              break;
            default:
              break;
          }
          break;

        case "Videos":
          switch (one.condition.value) {
            case "all":
              break;
            case "<100":
              query.videos = { $lte: 100 };
              break;
            case "<500":
              query.videos = { $lte: 500 };
              break;
            case "<1k":
              query.videos = { $lte: 1000 };
              break;
            case ">1k":
              query.videos = { $gte: 1000 };
              break;
            default:
              break;
          }
          break;

        default:
          break;
      }
    }

    const page = Number(pagination) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    console.log({ query, skip, limit });

    const result = await User.find(query)
      // .sort({ likes: "desc", pictures: "desc", videos: "desc" })
      .sort({ preference: 1 })
      .skip(skip)
      .limit(limit);
    console.log(result, "result");

    // Current date using moment
    const now = moment().toDate(); // Convert to a JavaScript Date object

    // Query to find products where now is between boostedFrom and boostedTo
    const boostedModels = await User.find({
      boostedFrom: { $lte: now }, // boostedFrom <= now
      boostedTo: { $gte: now },   // boostedTo >= now
    });

    // console.log('Currently Boosted Products:', boostedModels);
    // return boostedProducts;

    res.status(httpStatus.OK).json({ success: true, result,boostedModels });
  } catch (error) {
    console.error("creator.controller search error: ", error);
  } finally {
    next();
  }
}

/**
 * Batch create by scrapping data
 *
 * @param req
 * @param res
 * @param _next
 */
async function batchCreateByScrapping(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { models = [] } = req.body;

  try {
    const batchCreators = [];
    const creators = [];

    for (let i = 0; i < models.length; i++) {
      const one = models[i];
      const strCurTime = new Date().getTime().toString();

      const data = {
        role: USER_ROLES.CREATOR,
        name: one?.name ?? "",
        email: `${one?.name ?? ""}.${strCurTime}@offai.com`,
        phone: faker.phone.number(),
        age: faker.number.int({ min: 15, max: 45 }),
        address: [
          faker.location.country(),
          faker.location.state(),
          faker.location.city(),
          faker.location.streetAddress()
        ].join(" "),
        password: faker.internet.password(),
        status: USER_STATUS.ACTIVE,

        characteristics: one?.characteristics ?? [],
        subscriptionId: "",

        isStatic: false,
        avatar: one?.avatar ?? "",
        gender: one?.gender ?? GENDERS[faker.number.int({ min: 0, max: 2 })],
        description: one?.description ?? "",
        cost: one?.cost ?? 0,

        items: [faker.internet.emoji()],
        includes: one?.includes ?? "",

        likes: one?.likes ?? 0,
        pictures: one?.pictures ?? 0,
        videos: one?.videos ?? 0,

        shares: {
          twitter: faker.datatype.boolean(),
          instagram: faker.datatype.boolean(),
          tiktok: faker.datatype.boolean()
        }
      };

      const creator = await User.findOneAndUpdate(
        { includes: data.includes },
        data,
        { new: true, upsert: true }
      );

      batchCreators.push(data);
      creators.push(creator);
    }

    res.status(httpStatus.OK).json({
      success: true,
      models,
      batchCreators,
      creators
    });
  } catch (error) {
    console.error("creator.controller batchCreateByScrapping error: ", error);
  } finally {
    next();
  }
}

export default {
  search,
  batchCreateByScrapping,
  fetchUser
};
