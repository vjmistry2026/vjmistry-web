import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },
    bannerAlt: {
        type: String,
    },
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
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
            title: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            phoneOne: {
                type: String,
                required: true
            },
            phoneTwo: {
                type: String,
            },
            email: {
                type: String,
            },
            map: {
                type: String,
            },
        }]
    },
})

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);