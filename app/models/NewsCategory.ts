import mongoose from "mongoose";

const newsCategorySchema = new mongoose.Schema({
    name: { type: String, required: true }
})

export default mongoose.models.NewsCategory || mongoose.model("NewsCategory", newsCategorySchema);