import { ProductModel } from "../models/ProductModel.js";
import { ProductDetailsModel } from "../models/ProductDetailsModel.js";


export async function SaveProductService(req) {
    try {
        let user_id = new ObjectId(req.headers.user_id);
        let reqBody = req.body;

        /* =========================
           1️⃣ Save Product (Main)
        ========================= */
        let productData = {
            title: reqBody.title,
            description: reqBody.description,
            price: reqBody.price,
            discount: reqBody.discount,
            discountPrice: reqBody.discountPrice,
            image: reqBody.image,
            star: reqBody.star,
            stock: reqBody.stock,
            remark: reqBody.remark,
            brandID: reqBody.brandID,
            categoryID: reqBody.categoryID,
            createdBy: req.headers.user_id
        };

        let product = await ProductModel.create(productData);

        /* =========================
           2️⃣ Save Product Details
           (img1 → img8)
        ========================= */
        let productDetailsData = {
            productID: product._id,

            img1: reqBody.img1,
            img2: reqBody.img2,
            img3: reqBody.img3,
            img4: reqBody.img4,
            img5: reqBody.img5,
            img6: reqBody.img6,
            img7: reqBody.img7,
            img8: reqBody.img8,

            description: reqBody.description,
            color: reqBody.color,
            size: reqBody.size
        };

        let productDetails = await ProductDetailsModel.create(productDetailsData);

        return {
            status: "Success",
            message: "Product Saved Successfully.",
            data: {
                product,
                productDetails
            }
        };

    } catch (error) {
        return {
            status: "Fail",
            message: "Something Went Wrong.",
            error: error.message
        };
    }
}