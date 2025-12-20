import {FeaturesListService, LegalDetailsService} from "../services/FeaturesServices.js";

export async function FeaturesList(req, res) {
    let result = await FeaturesListService(req);
    return res.status(200).json(result);
}
export async function LegalDetails(req, res) {
    let result = await LegalDetailsService(req);
    return res.status(200).json(result);
}
