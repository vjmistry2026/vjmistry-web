import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },
    bannerAlt: {
        type: String,
    },
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
    firstSection: {
        title: {
            type: String,
            required: true
        },
        items: [{
            title: {
                type: String
            },
            image: {
                type: String
            },
            imageAlt: {
                type: String
            },
            logo: {
                type: String
            },
            logoAlt: {
                type: String
            },
            description: {
                type: String
            },
            homeImage: {
                type: String
            },
            homeImageAlt: {
                type: String
            }
        }]
    }
})

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);