import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
        required: true,
    },
    metaDescription: {
        type: String,
        required: true,
    },

    bannerSection: {
        items: [
            {
                image: {
                    type: String,
                    required: true,
                },
                imageAlt: {
                    type: String,
                },
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
            },
        ],
    },

    firstSection: {
        image: {
            type: String,
            required: true,
        },
        imageAlt: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        highlightText: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        buttonText: {
            type: String,
            required: true,
        },
    },

    secondSection: {
        items: [
            {
                number: {
                    type: String,
                    required: true,
                },
                value: {
                    type: String,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                imageAlt: {
                    type: String,
                },
            },
        ],
    },

    thirdSection: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },

    fourthSection: {
        title: {
            type: String,
            required: true,
        },
        items: [
            {
                image: {
                    type: String,
                    required: true,
                },
                imageAlt: {
                    type: String,
                },
                logo: {
                    type: String,
                    required: true,
                },
                logoAlt: {
                    type: String,
                },
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
            },
        ],
    },

    fifthSection: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        items: [
            {
                image: {
                    type: String,
                    required: true,
                },
                imageAlt: {
                    type: String,
                },
                logo: {
                    type: String,
                    required: true,
                },
                logoAlt: {
                    type: String,
                },
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
            },
        ],
    },

    sixthSection: {
        image: {
            type: String,
            required: true,
        },
        imageAlt: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },

    seventhSection: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        items: [
            {
                logo: {
                    type: String,
                    required: true,
                },
                logoAlt: {
                    type: String,
                },
            },
        ],
    },

    eighthSection: {
        image: {
            type: String,
            required: true,
        },
        imageAlt: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        buttonText: {
            type: String,
            required: true,
        },
    },
});

export default mongoose.models.Home || mongoose.model("Home", homeSchema);