import express from "express";
import AuthVerification from "../middlewares/AuthVerification";
import * as AdminProductController from "../controllers/admin/AdminProductController"

const router = express.Router();

router.post("/admin/productList", AuthVerification, AdminProductController.SaveProduct);
