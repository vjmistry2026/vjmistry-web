import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    banner: { type: String },
    bannerAlt: { type: String },
    pageTitle: { type: String },
    news: [{
        metaTitle: {
            type: String,
        },
        metaDescription: {
            type: String,
        },
        firstSection: {
            title: { type: String },
            slug: { type: String },
            date: { type: String },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "NewsCategory"
            },
            coverImage: { type: String },
            coverImageAlt: { type: String },
            thumbnail: { type: String },
            thumbnailAlt: { type: String }
        },
        secondSection: {
            items: [{
                title: { type: String },
                idToMap: { type: String }
            }]
        },
        thirdSection: {
            content: { type: String }
        }
    }],
});

export default mongoose.models.News ||
    mongoose.model("News", newsSchema);
