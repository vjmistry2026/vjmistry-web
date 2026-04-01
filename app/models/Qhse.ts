import mongoose from "mongoose";

const hseSchema = new mongoose.Schema({
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
        },
        image: {
            type: String,
            required: true
        },
        imageAlt: {
            type: String,
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
            number: {
                type: String,
            },
            value: {
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
            description: {
                type: String,
                required: true
            }
        }]
    },
    fourthSection: {
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
        description: {
            type: String,
            required: true
        }
    },
    fifthSection: {
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
                required: true
            },
            imageAlt: {
                type: String,
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }],
    },
    sixthSection: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        items: [{
            thumbnail: {
                type: String
            },
            thumbnailAlt: {
                type: String
            },
            title: {
                type: String
            },
            images: [{
                image: {
                    type: String
                },
                imageAlt: {
                    type: String
                }
            }]
        }]
    },
    seventhSection: {
        title: {
            type: String
        }
    }
})

export default mongoose.models.Hse || mongoose.model("Hse", hseSchema);