import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    userID : {type : mongoose.Schema.Types.ObjectId, required: true},
    payable : {type : Number, required: true},
    customerDetails : {type : String, required: true},
    shippingDetails : {type : String, required: true},
    tansectionID : {type : Number, required: true},
    validationID : {type : Number, required: true},
    deliveryStatus : {type : String, required: true},
    paymentStatus : {type : String, required: true},
    total : {type : Number, required: true},
    vat : {type : Number, required: true},
},
{
    timestamps: true,
    versionKey: false
}
)

export const InvoiceModel = mongoose.model("invoices", DataSchema);