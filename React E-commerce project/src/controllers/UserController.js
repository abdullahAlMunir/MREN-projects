import { 
    DeleteProfileService, 
    ReadProfileService, 
    SaveProfileService, 
    UserOTPService, 
    VerifyLoginService } from "../services/UserServices.js";

export async function UserOTP(req, res) {
    let result = await UserOTPService(req);
    return res.status(200).json(result);
}
export async function VerifyLogin(req, res) {
    let result = await VerifyLoginService(req);

    if (result["status"] === "Success") {

        // Set Cookie Option
        let CookieOption = {expires: new Date(Date.now() + 24 * 6060 * 1000), httpOnly: false};

        // Set Cookie with Response  

        res.cookie("token", result["token"], CookieOption);

        return res.status(200).json(result);
    } else {
    return res.status(200).json(result);
    }   
}
export async function UserLogout(req, res) {
    let CookieOpion = {expires: new Date(Date.now() - 24 * 6060 * 1000), httpOnly: false};
    res.cookie("token", "", CookieOpion);
    return res.status(200).json({ status:"Success"});
}
export async function CreateProfile(req, res) {
    let result = await SaveProfileService(req);
    return res.status(200).json(result);
}
export async function ReadProfile(req, res) {
    let result = await ReadProfileService(req);
    return res.status(200).json(result);
}
export async function UpdateProfile(req, res) {
    let result = await SaveProfileService(req);
    return res.status(200).json(result);
}
export async function DeleteProfile(req, res) {
    let result = await DeleteProfileService(req);
    return res.status(200).json(result);
}
