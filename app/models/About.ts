import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
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
    ogType: {
        type: String
    },
    ogImage: {
        type: String
    },
    pageTitle: {
        type: String,
        required: true
    },
    firstSection: {
        image: {
            type: String,
            required: true
        },
        imageAlt: {
            type: String,
        },
        title: {
            type: String,
            required: true
        },
        highlightText: {
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
        subTitle: {
            type: String,
            required: true
        },
        items: [{
            year: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            }
        }]
    },
    thirdSection: {
        items: [{
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            }
        }]
    },
    fourthSection: {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        imageAlt: {
            type: String,
        },
        items: [{
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            }
        }]
    },
    fifthSection: {
        items: [{
            number: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }]
    },
})

export default mongoose.models.About || mongoose.model("About", aboutSchema);