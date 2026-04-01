import mongoose from "mongoose";

const qualitySchema = new mongoose.Schema({
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
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
    pageTitle: {
        type: String,
        required: true
    },
    firstSection: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        imageAlt: {
            type: String
        },
    },
    secondSection: {
        title: {
            type: String,
            required: true
        },
        subTitle: {
            type: String
        },
        items: [{
            image: { type: String },
            imageAlt: { type: String },
            title: { type: String },
            description: { type: String }
        }]
    },
    thirdSection: {
        title: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
        },
        items: [{
            image: String,
            imageAlt: String,
        }]
    },
})

export default mongoose.models.Quality || mongoose.model("Quality", qualitySchema);