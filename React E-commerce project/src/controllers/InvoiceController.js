import { CreateInvoiceService, InvoiceListService, InvoiceProductListService, PaymentCancelService, PaymentFailService, PaymentIPNService, PaymentSuccessService } from "../services/InvoiceServices.js";

export async function CreateInvoice(req, res) {
    let result = await CreateInvoiceService(req);
    return res.status(200).json(result);
}
// export async function PaymentSuccess(req, res) {
//     let result = await PaymentSuccessService(req);
//     // return res.status(200).json(result);
//     return res.redirect("/orders");
// }

// export async function PaymentSuccess(req, res) {
//     let result = await PaymentSuccessService(req);
//     return res.status(200).json({ ...result, redirect: "/orders" });
// }
// export async function PaymentFail(req, res) {
//     let result = await PaymentFailService(req);
//     // return res.status(200).json(result);
//     return res.redirect("/orders");
// }
// export async function PaymentCancel(req, res) {
//     let result = await PaymentCancelService(req);
//     // return res.status(200).json(result);
//     return res.redirect("/orders");
// }

// export async function PaymentSuccess(req, res) {
//     let result = await PaymentSuccessService(req);
//     return res.status(200).json({ ...result, redirect: "/orders" });
// }

export async function PaymentSuccess(req, res) {
    let result = await PaymentSuccessService(req);
    return res.redirect("http://localhost:5173/orders");
}

export async function PaymentFail(req, res) {
    let result = await PaymentFailService(req);
    // return res.status(200).json(result);
    return res.redirect("/orders");
}
export async function PaymentCancel(req, res) {
    let result = await PaymentCancelService(req);
    // return res.status(200).json(result);
    return res.redirect("/orders");
}
export async function PaymentIPN(req, res) {
    let result = await PaymentIPNService(req);
    return res.status(200).json(result);
}
export async function InvoiceList(req, res) {
    let result = await InvoiceListService(req);
    return res.status(200).json(result);
}
export async function InvoiceProductList(req, res) {
    let result = await InvoiceProductListService(req);
    return res.status(200).json(result);
}