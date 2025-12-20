import { CartListService, RemoveCartListService, SaveCartListService, UpdateCartListService } from "../services/CartListServices.js";

export async function CartList(req, res) {
    let result = await CartListService(req);
    return res.status(200).json(result);
}
export async function SaveCartList(req, res) {
    let result = await SaveCartListService(req);
    return res.status(200).json(result);
}
export async function UpdateCartList(req, res) {
    let result = await UpdateCartListService(req);
    return res.status(200).json(result);
}
export async function RemoveCartList(req, res) {
    let result = await RemoveCartListService(req);
    return res.status(200).json(result);
}