import express from 'express';
import * as ProductController from "../controllers/ProductController.js";
import * as UserController from "../controllers/UserController.js";
import * as CartListController from "../controllers/CartListController.js";
import * as InvoiceController from "../controllers/InvoiceController.js";
import * as FeaturesController from "../controllers/FeaturesController.js";
import * as WishListController from "../controllers/WishListController.js"

import AuthVerification from "../middlewares/AuthVerification.js";

const router = express.Router();

// Product routes/endpoints

router.get("/ProductBrandList", ProductController.ProuctBrandList)
router.get("/ProductCategoryList", ProductController.ProuctCategoryList)
router.get("/ProductSliderList", ProductController.ProuctSliderList)
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand)
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory)
router.get("/ProductListBySimilarity/:CategoryID", ProductController.ProductListBySimilarity)
router.get("/ProductListByKeyword/:Keyword", ProductController.ProductListByKeyword)
router.get("/ProductListByRemark/:Remark", ProductController.ProductListByRemark)
router.get("/ProductDetails/:ProductID", ProductController.ProductDetails)
router.get("/ProductReviewList/:ProductID", ProductController.ProductReviewList)

router.post("/ProductListByFilter", ProductController.ProductListByFilter)

// User routes/endpoints
router.get("/UserOTP", UserController.UserOTP)
router.get("/VerifyRegistration", UserController.VerifyRegistration)
router.post("/register", UserController.RegisterUser)
router.get("/UserLogout", AuthVerification, UserController.UserLogout)
router.post("/CreateProfile", AuthVerification, UserController.CreateProfile)
router.get('/ReadProfile', AuthVerification, UserController.ReadProfile)
router.post("/UpdateProfile", AuthVerification, UserController.UpdateProfile)

// Cart routes/endpoints
router.post("/SaveCartList", AuthVerification, CartListController.SaveCartList)
router.get("/CartList", AuthVerification, CartListController.CartList)
router.post("/UpdateCartList/:cartID", AuthVerification, CartListController.SaveCartList)
router.delete("/RemoveCartList", AuthVerification, CartListController.RemoveCartList)

// Wish routes/endpoints
router.post("/SaveWishList", AuthVerification, WishListController.SaveWishList)
router.get("/WishList", AuthVerification, WishListController.WishList)
router.delete("/RemoveWishList", AuthVerification, WishListController.RemoveWishList)


// Invoice routes/endpoints
router.get("/CreateInvoice", AuthVerification, InvoiceController.CreateInvoice)

router.get("/InvoiceList", AuthVerification, InvoiceController.InvoiceList)
router.get("/InvoiceProductList/:invoice_id", AuthVerification, InvoiceController.InvoiceProductList)

// payment routes/endpoints
router.post("/PaymentSuccess/:trxID", AuthVerification, InvoiceController.PaymentSuccess)
router.post("/PaymentCancel/:trxID", AuthVerification, InvoiceController.PaymentCancel)
router.post("/PaymentFail/:trxID", AuthVerification, InvoiceController.PaymentFail)
router.post("/PaymentIPN/:trxID", AuthVerification, InvoiceController.PaymentIPN)

// features routes/endpoints
router.get("/FeaturesList", FeaturesController.FeaturesList)
router.get("/LegalDetails/:type", FeaturesController.LegalDetails)

// review routes/endpoints
router.post("/CreateReview", AuthVerification, ProductController.CreateReview)
export default router;