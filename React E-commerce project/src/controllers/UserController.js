import { 
    DeleteProfileService, 
    ReadProfileService, 
    SaveProfileService, 
    UserOTPService, 
    VerifyRegistrationService,
    RegisterUserService
} from "../services/UserServices.js";

export async function UserOTP(req, res) {
    let result = await UserOTPService(req);
    return res.status(200).json(result);
}
export async function VerifyRegistration(req, res) {
    let result = await VerifyRegistrationService(req);

    if (result.status === "Success") {

        // Cookie options
        let CookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            httpOnly: true
        };

        // Set token cookie
        res.cookie("token", result.token, CookieOption);

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
export async function RegisterUser(req, res) {
    let result = await RegisterUserService(req);
    return res.status(200).json(result);
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
