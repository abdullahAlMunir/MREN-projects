import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "seller", "moderator"], default: "user" },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }

},
    {
        timestamps: true,
        versionKey: false
    });

export const UserModel = mongoose.model("users", DataSchema);
