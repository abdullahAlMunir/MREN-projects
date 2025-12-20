import { SaveProductService } from "../../services/admin/AdminProductServices";

export async function SaveProduct(req, res) {
    let result = await SaveProductService(req);
    return res.status(200).json(result);
}