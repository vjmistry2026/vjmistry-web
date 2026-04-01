import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    pageTitle: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    bannerAlt: {
        type: String,
    },
    firstSection: {
        title: {
            type: String
        },
        description: {
            type: String
        }
    },
    items: [{
        item: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        thumbnailAlt: {
            type: String,
        },
        images: [{
            image: {
                type: String,
            },
            imageAlt: {
                type: String,
            },
        }],
    }],
})

export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);