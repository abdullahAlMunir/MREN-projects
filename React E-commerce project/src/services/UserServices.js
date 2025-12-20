import { EmailSend } from "../utility/EmailHelper.js";
import { ProfileModel } from "../models/ProfileModel.js";
import { EncodeToken } from "../utility/TokenHelper.js";
import { UserModel } from '../models/UserModel.js';
import mongoose from 'mongoose';

export async function UserOTPService(req) {
    // Email Verification
    try {
        let email = req.params.email;
        let code = Math.floor(100000 + Math.random() * 900000);
        let EmailText = "Email Verification";
        let EmailSubject = `Your verification Code/OTP for login is : ${code}`;

        await EmailSend(email, EmailText, EmailSubject);

        await UserModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true });
        return { status: "Success", message: "OTP sent successfully" };
    } catch (err) {
        return { status: "Fail", message: "Somthing Went Wrong" };
    }
}

export async function VerifyLoginService(req) {
    try {
        let email = req.params.email;
        let otp = req.params.otp;

        // Find user document first
        let user = await UserModel.findOne({ email: email, otp: otp });
        if (!user) {
            return { status: "Fail", message: "Invalid OTP" };
        }

        // Generate token with consistent user_id format
        let token = EncodeToken(email, user._id.toString());

        // Update OTP
        await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });

        return { status: "Success", message: "Valid OTP", token: token };
    } catch (error) {
        console.error("VerifyLogin Error:", error);
        return { status: "Fail", message: "Invalid OTP", error: error.message };
    }
}
export async function SaveProfileService(req) {
    try {
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let reqBody = req.body;
        reqBody.userID = user_id;

        let result = await ProfileModel.updateOne({ userID: user_id }, { $set: reqBody }, { upsert: true });

        return { status: "Success", message: "Profile Saved Successfully.", data : result };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}

export async function ReadProfileService(req) {
    try {
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let result = await ProfileModel.find({ userID: user_id })
        return { status: "Success", data: result };
    } catch (error) {
        return { status: "Fail", error: error.message };
    }
}


export async function UpdateProfileService(req) {
    try {
        let user_id = req.headers.user_id;
        let result = await ProfileModel.updateOne({ userID: user_id })
        return { status: "Success", message: "Profile Updated Successfully.", data: result };
    } catch (error) {
        return { status: "Fail", error: error.message };

    }
}

export async function DeleteProfileService(req) {
    try {
        let user_id = req.headers.user_id;
        let result = await ProfileModel.deleteOne({ userID: user_id })
        return { status: "Success", message: result };
    } catch (error) {
        return { status: "Fail", error: error.message };

    }
}
