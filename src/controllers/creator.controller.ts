/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
import { fakerEN_US as faker } from "@faker-js/faker";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { User } from "../models/user.model";
import { GENDERS, USER_ROLES, USER_STATUS } from "../utils/const.util";

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

    const result = await User.find(query).limit(100);

    res.status(httpStatus.OK).json({ success: true, result });
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
  batchCreateByScrapping
};
