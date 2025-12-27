import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    customerAddress: { type: String },
    customerCity: { type: String },
    customerCountry: { type: String },
    customerFax: { type: String },
    customerName: { type: String },
    customerPhone: { type: String },
    customerPostCode: { type: String },
    customerState: { type: String },
    shipmentAddress: { type: String },
    shipmentCity: { type: String },
    shipmentCountry: { type: String },
    shipmentName: { type: String },
    shipmentPhone: { type: String },
    shipmentPostCode: { type: String },
    shipmentState: { type: String },
},
    {
        timestamps: true,
        versionKey: false
    }
)

export const ProfileModel = mongoose.model("profiles", DataSchema);