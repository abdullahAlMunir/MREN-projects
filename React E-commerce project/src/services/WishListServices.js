import mongoose from 'mongoose';
import { WishModel } from '../models/WishModel.js';


const ObjectID = mongoose.Types.ObjectId;

export async function WishListService(req) {
    try {
        let user_id = new ObjectID(req.headers.user_id);
        let matchStage = { $match: { userID: user_id } };

        let JoinStageByProduct = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" } };
        let UnwindProductStage = { $unwind: "$product" };

        let JoinStageByBrand = { $lookup: { from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand" } };
        let UnwindBrandStage = { $unwind: "$brand" };

        let JoinStageByCategory = { $lookup: { from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category" } };
        let UnwindCategoryStage = { $unwind: "$category" };


        let unsetStage = {
            $unset: [
                "_id",
                "userID",
                "productID",
                // "product._id",
                "createdAt",
                "updatedAt",
                "product.createdAt",
                "product.updatedAt",
                "product.brandID",
                "product.categoryID",
                "brand._id",
                "brand.createdAt",
                "brand.updatedAt",
                "category.createdAt",
                "category.updatedAt",
                "category._id"
            ]
        }

        let data = await WishModel.aggregate([
            matchStage,
            JoinStageByProduct,
            UnwindProductStage,
            JoinStageByBrand,
            UnwindBrandStage,
            JoinStageByCategory,
            UnwindCategoryStage,
            // projectionStage
            unsetStage
        ])
        return { status: "Success", data: data };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function SaveWishListService(req) {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;     
        reqBody.userID = user_id;

        const data = await WishModel.updateOne(reqBody, { $set: reqBody }, { upsert: true });
        return { status: "Success", message: "Wish List Saved Successfully", data: data };
    } catch (error) {
        return { status: "Fail", message: error.message };

    }
}
export async function RemoveWishListService(req) {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;

        // Convert productID to ObjectId
        if (reqBody.productID) {
            reqBody.productID = new ObjectID(reqBody.productID);
        }

        await WishModel.deleteOne(reqBody);
        return { status: "Success", message: "Wish List Removed Successfully" };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong." };

    }
}
