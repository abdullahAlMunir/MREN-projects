import { FeaturesModel } from "../models/FeaturesModel.js";
import { LegalModel } from "../models/LegalModel.js"

export async function FeaturesListService(req) {
    try {
        let data = await FeaturesModel.find();

        return { status: "Success", data: data };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message }.toString();
    }
}
export async function LegalDetailsService(req) {
    try {
        let type = req.params.type;
        let data = await LegalModel.findOne({type : type});

        return { status: "Success", data: data };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}