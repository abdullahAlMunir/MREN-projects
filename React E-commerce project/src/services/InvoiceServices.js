import mongoose from "mongoose";
import { CartModel } from "../models/CartModel.js";
import { ProfileModel } from "../models/ProfileModel.js";
import { InvoiceModel } from "../models/InvoiceModel.js";
import { InvoiceProductModel } from "../models/InvoiceProductModel.js";
import { PaymentSettingModel } from "../models/PaymentSettingModel.js";
import FormData from "form-data";
import axios from "axios";

const ObjectID = mongoose.Types.ObjectId;

export async function CreateInvoiceService(req) {
    try {
        let user_id = new ObjectID(req.headers.user_id);
        let customerEmail = req.headers.email;

        let matchStage = { $match: { userID: user_id } };



        let JoinStageByProduct = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" } };
        let unwindStage = { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } };

        let CartProducts = await CartModel.aggregate([matchStage, JoinStageByProduct, unwindStage])

        let totalAmount = 0;
        CartProducts.forEach((element) => {
            let price;
            if (element["product"] && element["product"]["discount"]) {
                price = parseFloat(element["product"]["discountPrice"]);
            } else if (element["product"]) {
                price = parseFloat(element["product"]["price"]);
            } else {
                price = 0;
            }
            totalAmount += parseFloat(element["qty"]) * price;
        })

        let vat = totalAmount * .05;
        let payable = totalAmount + vat;



        // ==================== 2) Prepare Customer Details & Shipping Details ====================

        let Profile = await ProfileModel.aggregate([matchStage]);

        if (!Profile || Profile.length === 0) {
            return { status: "Fail", message: "Profile data not found for the user." };
        }
        let customer_details = `Name: ${Profile[0]["customerName"]}, Email: ${customerEmail}, Address: ${Profile[0]["customerAddress"]}, Phone: ${Profile[0]["customerPhone"]}`;
        let shipment_details = `Name: ${Profile[0]["shipmentName"]}, City: ${Profile[0]["shipmentCity"]}, Address: ${Profile[0]["shipmentAddress"]}, Phone: ${Profile[0]["shipmentPhone"]}`;


        // ==================== 3) Transaction & Other Details ====================

        let tran_id = Math.floor(9000000000 + Math.random() * 9000000000);
        let val_id = 0;
        let delivary_status = "Pending";
        let payment_status = "Pending";


        // ==================== 4) Create Invoice ====================

        let createInvoice = await InvoiceModel.create({
            userID: user_id,
            payable: payable,
            customerDetails: customer_details,
            shippingDetails: shipment_details,
            tansectionID: tran_id,
            validationID: val_id,
            deliveryStatus: delivary_status,
            paymentStatus: payment_status,
            total: totalAmount,
            vat: vat,
        })


        // ==================== 5) Create Invoice Product ====================

        let invoice_id = createInvoice["_id"];

        CartProducts.forEach(async (element) => {
            await InvoiceProductModel.create({
                userID: user_id,
                productID: element["productID"],
                invoiceID: invoice_id,
                qty: element["qty"],
                price: element["product"]["discount"] ? element["product"]["discountPrice"] : element["product"]["price"],
                color: element["color"],
                size: element["size"],
            });
        });

        // ==================== 6) Remove Carts ====================


        await CartModel.deleteMany({ userID: user_id });


        // ==================== 7) Prepare SSL Payment ====================

        let PaymentSettings = await PaymentSettingModel.find();


        const form = new FormData();
        form.append("store_id", PaymentSettings[0]["store_id"]); //console.log("store_id:", PaymentSettings[0]["store_id"]);
        form.append("store_passwd", PaymentSettings[0]["store_passwd"]); //console.log("store_passwd:", PaymentSettings[0]["store_passwd"]);
        form.append("total_amount", payable.toString()); //console.log("total_amount:", payable.toString());
        form.append("currency", PaymentSettings[0]["currency"]); //console.log("currency:", PaymentSettings[0]["currency"]);
        form.append("tran_id", tran_id); //console.log("tran_id:", tran_id);
        form.append("success_url", `${PaymentSettings[0]["success_url"]}/${tran_id}`); //console.log("success_url:", `${PaymentSettings[0]["success_url"]}/${tran_id}`);
        form.append("fail_url", `${PaymentSettings[0]["fail_url"]}/${tran_id}`); //console.log("fail_url:", `${PaymentSettings[0]["fail_url"]}/${tran_id}`);
        form.append("cancel_url", `${PaymentSettings[0]["cancel_url"]}/${tran_id}`); //console.log("cancel_url:", `${PaymentSettings[0]["cancel_url"]}/${tran_id}`);
        form.append("ipn_url", `${PaymentSettings[0]["ipn_url"]}/${tran_id}`); //console.log("ipn_url:", `${PaymentSettings[0]["ipn_url"]}/${tran_id}`);


        form.append("cus_name", Profile[0]["customerName"]); //console.log("cus_name:", Profile[0]["customerName"]);
        form.append("cus_email", customerEmail); //console.log("cus_email:", customerEmail);
        form.append("cus_add1", Profile[0]["customerAddress"]); //console.log("cus_add1:", Profile[0]["customerAddress"]);
        form.append("cus_add2", Profile[0]["customerAddress"]); //console.log("cus_add2:", Profile[0]["customerAddress"]);
        form.append("cus_city", Profile[0]["customerCity"]); //console.log("cus_city:", Profile[0]["customerCity"]);
        form.append("cus_state", Profile[0]["customerState"]); //console.log("cus_state:", Profile[0]["customerState"]);
        form.append("cus_postcode", Profile[0]["customerPostcode"]); //console.log("cus_postcode:", Profile[0]["customerPostcode"]);
        form.append("cus_country", Profile[0]["customerCountry"]); //console.log("cus_country:", Profile[0]["customerCountry"]);
        form.append("cus_phone", Profile[0]["customerPhone"]); //console.log("cus_phone:", Profile[0]["customerPhone"]);
        form.append("cus_fax", Profile[0]["customerFax"]); //console.log("cus_fax:", Profile[0]["customerFax"]);

        form.append("shipping_method", "YES");

        form.append("ship_name", Profile[0]["shipmentName"]); //console.log("ship_name:", Profile[0]["shipmentName"]);
        form.append("ship_add1", Profile[0]["shipmentAddress"]); //console.log("ship_add1:", Profile[0]["shipmentAddress"]);
        form.append("ship_add2", Profile[0]["shipmentAddress"]); //console.log("ship_add2:", Profile[0]["shipmentAddress"]);
        form.append("ship_city", Profile[0]["shipmentCity"]); //console.log("ship_city:", Profile[0]["shipmentCity"]);
        form.append("ship_state", Profile[0]["shipmentState"]); //console.log("ship_state:", Profile[0]["shipmentState"]);
        form.append("ship_country", Profile[0]["shipmentCountry"]); //console.log("ship_country:", Profile[0]["shipmentCountry"]);
        form.append("ship_postcode", Profile[0]["shipmentPostcode"]); //console.log("ship_postcode:", Profile[0]["shipmentPostcode"]);
        form.append("ship_phone", Profile[0]["shipmentPhone"]); //console.log("ship_phone:", Profile[0]["shipmentPhone"]);

        form.append('product_name', 'According Invoice')
        form.append('product_category', 'According Invoice')
        form.append('product_profile', 'According Invoice')
        form.append('product_amount', 'According Invoice')

        let SSLRes = await axios.post(PaymentSettings[0]["init_url"], form);
        return { status: "Success", data: SSLRes.data };
    } catch (error) {
        console.log(error.message);
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function PaymentSuccessService(req) {
    try {
        let trxID = req.params.trxID;
        let status = await InvoiceModel.updateOne({ tansectionID: trxID }, { paymentStatus: "Success" });
        return { status: "Success", message: "Payment Status Updated Successfully, Payment IPN redirected Successfully." };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function PaymentFailService(req) {
    try {
        let trxID = req.params.trxID;

        await InvoiceModel.updateOne({ tansectionID: trxID }, { paymentStatus: "Fail" });

        return { status: "Fail", message: "Payment Status Failed." };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function PaymentCancelService(req) {
    try {
        let trxID = req.params.trxID;

        await InvoiceModel.updateOne({ tansectionID: trxID }, { paymentStatus: "Cancel" });

        return { status: "Cancel", message: "Payment Status Cancellled." };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function PaymentIPNService(req) {
    try {
        let trxID = req.params.trxID;
        let status = req.body["status"];
        await InvoiceModel.updateOne({ tansectionID: trxID }, { paymentStatus: status });

        return { status: "Redirected", message: "Payment IPN redirected Successfully." };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function InvoiceListService(req) {
    try {
        let user_id = req.headers.user_id;
        let invoice = await InvoiceModel.find({ userID: user_id });

        return { status: "Success", data: invoice };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function InvoiceProductListService(req) {
    try {
        const user_id = new ObjectID(req.headers.user_id);
        const invoice_id = new ObjectID(req.params.invoice_id);

        // Aggregation pipeline
        const matchStage = { $match: { userID: user_id, invoiceID: invoice_id } };
        const JoinStageByProduct = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" } };
        const UnwindStage = { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } };

        const products = await InvoiceProductModel.aggregate([
            matchStage,
            JoinStageByProduct,
            UnwindStage
        ]);

        return { status: "Success", data: products };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
