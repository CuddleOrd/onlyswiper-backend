import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { User } from "../models/user.model";
import { Favorite } from "../models/favorite.model";
import SwipeModel from "../models/swipes.model";
import { GENDERS, USER_ROLES, USER_STATUS } from "../utils/const.util";
import { fakerEN_US as faker } from "@faker-js/faker";

/**
 * Get
 *
 * @param req
 * @param res
 * @param _next
 */
async function get(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return;
    }

    const { _id: userId } = req.user;

    const favorite = await Favorite.findOne({ userId });
    const result = await User.find({ _id: { $in: favorite?.creatorId } });

    res.status(httpStatus.OK).json({ success: true, result });
  } catch (error) {
    console.error("favorite.controller get error: ", error);
  } finally {
    next();
  }
}

/**
 * Like creator
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function like(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return;
    }

    const { creatorId } = req.body;
    const { _id: userId } = req.user;

    const update = { $addToSet: { creatorId } };

    await Favorite.findOneAndUpdate({ userId }, update, {
      new: true,
      upsert: true
    });

    res
      .status(httpStatus.OK)
      .json({ success: true, msg: "You liked a creator" });
  } catch (error) {
    console.error("favorite.controller like error: ", error);
  } finally {
    next();
  }
}

/**
 * Dislike creator
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function saveModel(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return;
    }
    const strCurTime = new Date().getTime().toString();
    const { description	,name	,file_name	 } = req.body;
    const newUser = new User({
      role: USER_ROLES.CREATOR,
      name: name,
      email: `${name ?? ""}.${strCurTime}@offai.com`,
      preference: 1.5,
      gender:'Female',
      phone: faker.phone.number(),
      description:description,
      avatar:file_name,
      password: faker.internet.password(),
      status: USER_STATUS.ACTIVE,
      likes: 0,
      pictures:  0,
      videos:  0,


    });
    newUser.save()
  .then(user => {
    console.log('User saved:', user);
    
  })
  .catch(error => {
    console.error('Error saving user:', error);
   
  });
    console.log(description)
    res
      .status(httpStatus.OK)
      .json({ success: true, msg: "Saved Successfully" });
    
  }catch (error) {
    console.error("favorite.controller dislike error: ", error);
    // return res
    //   .status(500)
    //   .json({ success: true, msg: "Error saving" });
  } finally {
    next();
  }
}
async function dislike(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return;
    }

    const { creatorId } = req.body;
    const { _id: userId } = req.user;

    const update = { $pull: { creatorId } };

    await Favorite.findOneAndUpdate({ userId }, update, {
      new: true,
      upsert: true
    });

    res
      .status(httpStatus.OK)
      .json({ success: true, msg: "You disliked a creator" });
  } catch (error) {
    console.error("favorite.controller dislike error: ", error);
  } finally {
    next();
  }
}
async function saveSwipe(req: Request, res: Response, next: NextFunction) {
  // console.log(req.user)
  try {
    if (!req.user) {
      
      return;
    }

    console.log("You're here!@2.")

    const { swipes } = req.body;
    console.log(swipes)
    const { _id: user } = req.user;
    console.log(user)
    // let swipes=10

    const updatedLike = await SwipeModel.findOneAndUpdate(
      { user }, // Search by uniqueId
      { $set: { swipes } }, // Update likes
      { new: true, upsert: true } // Options: return the updated document, create if it doesn't exist
  );

  console.log('Like entry created or updated:', updatedLike);

    // const update = { $pull: { creatorId } };

    // await Favorite.findOneAndUpdate({ userId }, update, {
    //   new: true,
    //   upsert: true
    // });

    res
      .status(httpStatus.OK)
      .json({ success: true, msg: "You disliked a creator" });
  } catch (error) {
    console.error("favorite.controller dislike error: ", error);
  } finally {
    next();
  }
}
async function fetchSwipesById(req: Request, res: Response, next: NextFunction) {
  // const { user,swipes } = req.body;
  if (!req.user) {
      
    return;
  }
  

    try {
      const { _id: user } = req.user;
        const swipes = await SwipeModel.findOne({ user });

        if (swipes) {
            res.status(200).json({swipes,code:1 }); // Return the like entry
        } else {
            res.status(200).json({ message: 'No like entry found for unique ID',code:0,swipes }); // Not found
        }
    } catch (error) {
        console.error('Error fetching like entry:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Server error
    }
}
async function saveSwipe1(req: Request, res: Response, next: NextFunction) {

  if (!req.user) {
    res
  .status(httpStatus.OK)
  .json({ success: true, msg: "Not logged in" });
    return;
  }
  const { user,swipes } = req.body;
  const { _id: userId } = req.user;

  console.log(userId)
  console.log("You're good to go")

  try {
    const updatedLike = await SwipeModel.findOneAndUpdate(
        { user }, // Search by uniqueId
        { $set: { swipes } }, // Update likes
        { new: true, upsert: true } // Options: return the updated document, create if it doesn't exist
    );

    console.log('Like entry created or updated:', updatedLike);
} catch (error) {
    console.error('Error creating or updating like entry:', error);
}

  console.log(req.body);
  res
  .status(httpStatus.OK)
  .json({ success: true, msg: "Swipes saved" });
}


export default {
  get,
  like,
  dislike,
  saveSwipe,
  fetchSwipesById,
  saveModel
};
