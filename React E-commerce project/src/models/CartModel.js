import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    productID : {type : mongoose.Schema.Types.ObjectId, required: true},
    userID : {type : mongoose.Schema.Types.ObjectId, required: true},
    color : {type : String, required: true},
    price : {type : Number, required: true},    
    qty : {type : Number , required: true},    
    size : {type : Number , required: true},    
},
{
    timestamps: true,
    versionKey: false
}
)

export const CartModel = mongoose.model("carts", DataSchema);

