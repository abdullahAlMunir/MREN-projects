import { BrandModel } from "../models/BrandModel.js";
import { CategoryModel } from "../models/CategoryModel.js";
import { ProductSliderModel } from "../models/ProductSliderModel.js";
import { UserModel } from "../models/UserModel.js";
import { ProductModel } from "../models/ProductModel.js";
import { ProductDetailsModel } from "../models/ProductDetailsModel.js";
import { ReviewModel } from "../models/ReviewModel.js";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export async function BrandListService(req, res) {
    try {
        let data = await BrandModel.find();
        return { status: "Success", data: data };
    } catch (err) {
        return { status: "Fail", data: err }.toString();
    }
}
export async function CategoryListService(req, res) {
    try {
        let data = await CategoryModel.find();
        return { status: "Success", data: data };
    } catch (err) {
        return { status: "Fail", data: err }.toString();
    }
}
export async function SliderListService(req, res) {
    try {
        let data = await ProductSliderModel.find();
        return { status: "Success", data: data };
    } catch (err) {
        return { status: "Fail", data: err }.toString();
    }
}
export async function ListByBrandService(req) {
    try {

        let BrandID = new ObjectId(req.params.BrandID);
        let MatchStage = { $match: { brandID: BrandID } };

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };

        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let projectionStage = { $project: { "brand._id": 0, "category._id": 0, "categoryID": 0, "brandID": 0 } }

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage,
            projectionStage

        ]);
        return { status: "Success", data: data };

    } catch (err) {
        return { status: "Fail", data: err }.toString();
    }

}
export async function ListByCategoryService(req, res) {
    try {

        let CategoryID = new ObjectId(req.params.CategoryID);

        let MatchStage = { $match: { categoryID: CategoryID } };

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
        let UnwindBrandStage = { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } }

        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
        let UnwindCategoryStage = { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } }

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage

        ]);

        return { status: "Success", data: data };

    } catch (error) {
        return { status: "Fail", error: error.message };
    }
}
export async function ListByRemarkService(req, res) {
    try {

        let Remark = req.params.Remark;
        let MatchStage = { $match: { remark: Remark } };

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };

        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let projectionStage = { $project: { "brand._id": 0, "category._id": 0, "categoryID": 0, "brandID": 0 } }

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage,
            projectionStage

        ]);
        return { status: "Success", data: data };

    } catch (err) {
        return { status: "Fail", data: err }.toString();
    }
}
export async function ListBySimilarityService(req) {
    try {

        let Remark = req.params.Remark;
        let MatchStage = { $match: { remark: Remark } };
        let LimitStage = { $limit: 20 }

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };

        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let projectionStage = { $project: { "brand._id": 0, "category._id": 0, "categoryID": 0, "brandID": 0 } }

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage,
            projectionStage, LimitStage

        ]);
        return { status: "Success", data: data };

    } catch (err) {
        return { status: "Fail", data: err }.toString();
    }

}
export async function DetailsService(req) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.ProductID)) {
            return { status: "Fail", error: "Invalid product ID" };
        }

        let ProductID = new mongoose.Types.ObjectId(req.params.ProductID);

        let MatchStage = { $match: { _id: ProductID } };

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
        let UnwindBrandStage = { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } };

        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
        let UnwindCategoryStage = { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } };

        let JoinWithDtailsStage = { $lookup: { from: "productdetails", localField: "_id", foreignField: "productID", as: "details" } };
        let UnwindDetailsStage = { $unwind: { path: "$details", preserveNullAndEmptyArrays: true } }

        let ProjectionStage = {
            $project: {
                "brand.createdAt": 0, "brand.updatedAt": 0, "category.createdAt": 0, "category.updatedAt": 0, "details.createdAt": 0, "details.updatedAt": 0
            }
        };

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage, JoinWithCategoryStage, JoinWithDtailsStage,
            UnwindBrandStage, UnwindCategoryStage, UnwindDetailsStage,
            ProjectionStage
        ]);

        return { status: "Success", data: data };
    } catch (error) {
        return { status: "Fail", data: error.message }

    }

}
export async function ListByKeywordService(req, res) {
    try {
        let SearchRegex = { "$regex": req.params.Keyword, "$options": "i" };
        let SearchParams = [{ title: SearchRegex }, { shortDes: SearchRegex }];
        let SearchStage = { $or: SearchParams };

        let MatchStage = { $match: SearchStage };

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: { "brand._id": 0, "brand._id": 0, "category._id": 0, "categoryID": 0, "brandID": 0 } };

        let data = await ProductModel.aggregate([
            MatchStage, JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage, ProjectionStage
        ])
        return { status: "Success", data: data };
    } catch (error) {
        return { status: "Fail", data: error.message };
    }
}
// export async function ReviewListService(req, res) {
//     try {
//         let ProductID = new ObjectId(req.params.ProductID);
//         let MatchStage = { $match: { ProductID: ProductID } };

//         let JoinWithprofileStage = { $lookup: { from: "profiles", localField: "userID", foreignField: "userID", as: "profile" } };
//         let UnwindProfileStage = { $unwind: "$profile" }
//         let projectionStage = {
//             $project: {
//                 "des": 1,
//                 "rating": 1,
//                 "profile.cus_name": 1,
//             }
//         }

//         let data = await ReviewModel.aggregate([
//             MatchStage,
//             JoinWithprofileStage,
//             UnwindProfileStage,
//             projectionStage
//         ])

//         return { status: "Success", data: data };
//     } catch (error) {
//         return { status: "Fail", data: error }.toString();
//     }
// }          // not working

export async function ReviewListService(req, res) {
    try {

        let ProductID = new mongoose.Types.ObjectId(req.params.ProductID);
        let MatchStage = { $match: { productID: ProductID } };
        let JoinWithProfileStage = { $lookup: { from: "profiles", localField: "userID", foreignField: "userID", as: "profile" } };
        let UnwindProfileStage = { $unwind: "$profile" };
        let ProjectionStage = { $project: { "des": 1, "rating": 1, "profile.customerName": 1 } }

        let data = await ReviewModel.aggregate([
            MatchStage, JoinWithProfileStage,
            UnwindProfileStage, ProjectionStage
        ])

        return { status: "Success", data: data };
    } catch (error) {
        return { status: "Fail", error: error.message };
    }
}
export async function CreateReviewService(req, res) {
    try {

        let user_id = req.headers.user_id;
        // let productID = req.params.productID;
        let reqBody = req.body;

        let data = await ReviewModel.create({
            userID: user_id,
            productID: reqBody["productID"],
            rating: reqBody["rating"],
            des: reqBody["des"]
        })


        return { status: "Success", data: data };
    } catch (error) {
        return { status: "Fail", data: error.message };
    }
}
// export async function ProductListByFilterService(req, res) {
//     try {

//         let matchConditioins = {};
//         if (req.body["categoryID"]) {
//             matchConditioins.categoryID = new ObjectId(req.body["categoryID"])
//         }
//         if (req.body["brandID"]) {
//             matchConditioins.brandID = new ObjectId(req.body["brandID"])
//         }

//         let MatchStage = {$match : matchConditioins};

//         let AddFieldsStage = {
//             $addFields : {
//                 numericPrice: {
//                     $toInt : "$price"
//                 }
//             }
//         }

//         let priceMin = parseInt(req.body["priceMin"]);
//         let priceMax = parseInt(req.body["priceMax"]);
//         let PriceMatchConditions = {};

//         if (!isNaN(priceMin)) {
//             PriceMatchConditions["numericPrice"] = {
//                 $gte : priceMin
//             }
//         }

//         if (!isNaN(priceMax)) {
//             PriceMatchConditions["numericPrice"] = {
//                 ...(PriceMatchConditions["numericPrice"] || {}), $lte : priceMax
//             };
//         }

//         let PriceMatchStage = {$match : PriceMatchConditions};

//         let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
//         let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
//         let UnwindBrandStage = { $unwind: "$brand" }
//         let UnwindCategoryStage = { $unwind: "$category" }
//         let projectionStage = { $project: { "brand._id": 0, "category._id": 0, "categoryID": 0, "brandID": 0 } }

//         const data = await ProductModel.aggregate([
//             MatchStage,
//             AddFieldsStage,
//             PriceMatchStage,
//             JoinWithBrandStage, JoinWithCategoryStage,
//             UnwindBrandStage, UnwindCategoryStage,
//             projectionStage

//         ]);

//         return { status: "Success", data: data };
//     } catch (error) {
//         return { status: "Fail", data: error.message };

//     }
// }
export async function ProductListByFilterService(req, res) {
    try {

        let matchConditions = {};
        if (req.body["categoryID"]) {
            matchConditions.categoryID = new ObjectId(req.body["categoryID"]);
        }
        if (req.body["brandID"]) {
            matchConditions.brandID = new ObjectId(req.body["brandID"]);
        }

        let MatchStage = { $match: matchConditions };

        let AddFieldsStage = {
            $addFields: { numericPrice: { $toInt: "$price" } }
        };

        let priceMin = parseInt(req.body["priceMin"]);
        let priceMax = parseInt(req.body["priceMax"]);
        let PriceMatchConditions = {};

        if (!isNaN(priceMin)) {
            PriceMatchConditions["numericPrice"] = { $gte: priceMin };
        }

        if (!isNaN(priceMax)) {
            PriceMatchConditions["numericPrice"] = { ...(PriceMatchConditions["numericPrice"] || {}), $lte: priceMax };
        }

        let PriceMatchStage = { $match: PriceMatchConditions };

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: { "brand._id": 0, "category._id": 0, "categoryID": 0, "brandID": 0 } };

        let data = await ProductModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage, ProjectionStage
        ])
        return { status: "Success", data: data };
    } catch (error) {
        return { status: "Fail", data: error.message };

    }
}
