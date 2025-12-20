import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    otp: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "seller", "moderator"], default: "user" },
    isActive: { type: Boolean, default: true }

},
{
    timestamps: true,
    versionKey: false
});

export const UserModel = mongoose.model("users", DataSchema);
