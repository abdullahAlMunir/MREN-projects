import { RemoveWishListService, SaveWishListService, WishListService } from "../services/WishListServices.js";

export async function WishList(req, res) {
    let result = await WishListService(req);
    return res.status(200).json(result);
}
export async function SaveWishList(req, res) {
    let result = await SaveWishListService(req);
    return res.status(200).json(result);
}

export async function RemoveWishList(req, res) {
    let result = await RemoveWishListService(req);
    return res.status(200).json(result);
}