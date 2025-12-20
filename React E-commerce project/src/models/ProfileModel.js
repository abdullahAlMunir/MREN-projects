import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    customerAddress: { type: String, required: true },
    customerCity: { type: String, required: true },
    customerCountry: { type: String, required: true },
    customerFax: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerPostCode: { type: String, required: true },
    customerState: { type: String, required: true },
    shipmentAddress: { type: String, required: true },
    shipmentCity: { type: String, required: true },
    shipmentCountry: { type: String, required: true },
    shipmentName: { type: String, required: true },
    shipmentPhone: { type: String, required: true },
    shipmentPostCode: { type: String, required: true },
    shipmentState: { type: String, required: true },
},
    {
        timestamps: true,
        versionKey: false
    }
)

export const ProfileModel = mongoose.model("profiles", DataSchema);