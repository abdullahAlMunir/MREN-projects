import { CartModel } from "../models/CartModel.js";
import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;

export async function CartListService(req) {
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
                "product._id",
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

        let data = await CartModel.aggregate([
            matchStage,
            JoinStageByProduct,
            UnwindProductStage,
            JoinStageByBrand,
            UnwindBrandStage,
            JoinStageByCategory,
            UnwindCategoryStage,
            unsetStage
        ])
        

        return { status: "Success", data: data };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function SaveCartListService(req) {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;

        let result = await CartModel.create(reqBody);
        return { status: "Success", message: "Cart List Created Successfully.", data: result };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };

    }
}
export async function UpdateCartListService(req) {
    try {

        let user_id = req.headers.user_id;
        let reqBody = req.body;
        let cartID = req.params.cartID;

        await CartModel.updateOne({ _id: cartID, userID: user_id }, { $set: reqBody });
        
        return { status: "Success", message: "Cart List Updated Successfully." };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function RemoveCartListService(req) {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;

        let result = await CartModel.deleteOne(reqBody);
        return { status: "Success", message: "Cart List Deleted Successfully.", data: result };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
