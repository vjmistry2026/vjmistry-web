import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    banner: { type: String },
    bannerAlt: { type: String },
    pageTitle: { type: String },
    secondSection: {
        title: { type: String },
        description: { type: String },
        items: [{
            number: { type: String },
            value: { type: String }
        }]
    },
    thirdSection: {
        title: { type: String },
        description: { type: String }
    },
    equipments: [
        {
            title: { type: String },
            description: { type: String },
            image: { type: String },
            imageAlt: { type: String },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "EquipmentCategory"
            }
        },
    ],
});

export default mongoose.models.Equipment ||
    mongoose.model("Equipment", equipmentSchema);
