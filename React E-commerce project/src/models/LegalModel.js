import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    description: { type: String, required: true },
    type: { type: String, required: true },
},
    {
        timestamps: true,
        versionKey: false
    }
)

export const LegalModel = mongoose.model("legals", DataSchema);