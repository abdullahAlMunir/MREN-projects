import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Boolean, required: true },
    discountPrice: { type: Number, required: true },
    image: { type: String, required: true },
    star: { type: String, required: true },
    stock: { type: Boolean, required: true },
    remark: { type: String, required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'categories' },
    brandID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'brands' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export const ProductModel = mongoose.model("products", DataSchema);