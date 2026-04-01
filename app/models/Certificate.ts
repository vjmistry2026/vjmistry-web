import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
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
        required: true
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
        }
    },
    secondSection: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        items: [{
            image: {
                type: String,
            },
            imageAlt: {
                type: String,
            },
            title: {
                type: String,
            },
            description: {
                type: String,
            }
        }]
    },
    thirdSection: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        items: [{
            title: {
                type: String,
                required: true
            },
            file: {
                type: String,
                required: true
            }
        }]
    }
})

export default mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);