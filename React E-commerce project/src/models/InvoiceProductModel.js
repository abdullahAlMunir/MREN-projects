import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    userID : {type : mongoose.Schema.Types.ObjectId, required: true},
    productID : {type : mongoose.Schema.Types.ObjectId, required: true},
    invoiceID : {type : mongoose.Schema.Types.ObjectId, required: true},
    qty : {type : Number, required: true},
    price : {type : Number, required: true},
    color : {type : String, required: true},
    size : {type : String, required: true},

},
{
    timestamps: true,
    versionKey: false
}
)

export const InvoiceProductModel = mongoose.model("invoiceProducts", DataSchema);