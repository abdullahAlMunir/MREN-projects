import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.js";
import { ProfileModel } from "../models/ProfileModel.js";
import { EmailSend } from "../utility/EmailHelper.js";
import { EncodeToken } from "../utility/TokenHelper.js";
import mongoose from 'mongoose';

// export async function UserOTPService(req) {
//     // Email Verification
//     try {
//         // let email = req.body.email;
//         let code = Math.floor(100000 + Math.random() * 900000);

//         let EmailText = "Email Verification";
//         let EmailSubject = `Your verification Code/OTP for login is : ${code}`;

//         await EmailSend(email, EmailText, EmailSubject);

//         await UserModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true });
//         return { status: "Success", message: "OTP sent successfully" };
//     } catch (error) {
//         return { status: "Fail", message: "Something Went Wrong", error: error.message };
//     }
// }

export async function UserOTPService(email) {
    try {
        let code = Math.floor(100000 + Math.random() * 900000);

        let EmailText = "Email Verification";
        let EmailSubject = `Your verification OTP is : ${code}`;

        await EmailSend(email, EmailText, EmailSubject);

        await UserModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true });

        return { status: "Success", message: "OTP sent successfully" };

    } catch (error) {
        return {
            status: "Fail",
            message: "Something Went Wrong",
            error: error.message
        };
    }
}

export async function VerifyRegistrationService(req) {
    try {
        let email = req.body.email;
        let otp = req.body.otp;
        let role = req.body.role;

        /* =========================
           1️⃣ Verify OTP
        ========================= */
        let user = await UserModel.findOne({ email: email, otp: otp });
        if (!user) {
            return { status: "Fail", message: "Invalid OTP" };
        }

        /* =========================
            2️⃣ Mark User Verified
        ========================= */
        user.isVerified = true;
        user.otp = "0";
        await user.save();

        /* =========================
           4️⃣ Generate Token
        ========================= */
        let token = EncodeToken(email, user._id.toString(), role);

        // Update OTP
        await UserModel.updateOne({ email: email }, { $set: { otp: "1" } });

        return { status: "Success", message: "Valid OTP", token: token };
    } catch (error) {
        console.error("VerifyRegistration Error:", error);
        return { status: "Fail", message: "Invalid OTP", error: error.message };
    }
}
export async function VerifyRegistrationWithPasswordService(req) {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let role = req.body.role; // role requested (admin/user)

        // 1️⃣ Find user by email
        let user = await UserModel.findOne({ email: email });
        if (!user) {
            return { status: "Fail", message: "Invalid credentials" };
        }

        // 2️⃣ Role must match DB role
        if (user.role !== role) {
            return { status: "Fail", message: "Unauthorized role" };
        }

        // 3️⃣ Verify password
        let isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { status: "Fail", message: "Invalid credentials" };
        }

        // 4️⃣ Generate token with DB role
        let token = EncodeToken(
            user.email,
            user._id.toString(),
            user.role
        );

        return {
            status: "Success",
            message: "Login successful",
            token: token
        };

    } catch (error) {
        console.error("Login Error:", error);
        return {
            status: "Fail",
            message: "Login failed",
            error: error.message
        };
    }
}
export async function SaveProfileService(req) {
    try {
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let reqBody = req.body;
        reqBody.userID = user_id;

        let result = await ProfileModel.updateOne({ userID: user_id }, { $set: reqBody }, { upsert: true });

        return { status: "Success", message: "Profile Saved Successfully.", data: result };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function RegisterUserService(req) {
    try {
        let reqBody = req.body;

        /* =========================
            1️⃣ Check Existing User
        ========================= */
        let existingUser = await UserModel.findOne({ email: reqBody.email });
        if (existingUser && existingUser.isVerified === true) {
            return {
                status: "Fail",
                message: "User already registered"
            };
        }


        /* =========================
           2️⃣ Hash Password
        ========================= */
        let hashedPassword = await bcrypt.hash(reqBody.password, 10);

        /* =========================
            3️⃣ Create / Update User
        ========================= */
        let userData = {
            email: reqBody.email,
            password: hashedPassword,
            role: reqBody.role,
            name: reqBody.name,
            isVerified: false
        };

        let user = await UserModel.findOneAndUpdate(
            { email: reqBody.email },
            { $set: userData },
            { upsert: true, new: true }
        );


        /* =========================
           4️⃣ Create Profile
        ========================= */
        let profileData = {
            userID: user._id,

            customerName: reqBody.name
        };

        let profile = await ProfileModel.create(profileData);

        /* =========================
            Send OTP
        ========================= */
        let otpResult = await UserOTPService(reqBody.email);
        if (otpResult.status !== "Success") {
            return otpResult;
        }


        return {
            status: "Success",
            message: "OTP sent. Please verify to complete registration.",
            data: {
                userID: user._id,
                email: user.email
            }
        };

    } catch (error) {
        return {
            status: "Fail",
            message: "Registration Failed.",
            error: error.message
        };
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
