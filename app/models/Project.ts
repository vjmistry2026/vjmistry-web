import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  banner: { type: String },
  bannerAlt: { type: String },
  pageTitle: { type: String },
  projects: [
    {
      metaTitle: { type: String },
      metaDescription: { type: String },
      banner: { type: String },
      bannerAlt: { type: String },
      thumbnail: { type: String },
      thumbnailAlt: { type: String },
      title: { type: String },
      slug: { type: String },
      firstSection: {
        yearOfCompletion: { type: String },
        expertise: { type: String },
        location: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Location",
        },
        client: { type: String },
        status: { type: String },
        projectType: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProjectType",
        },
        sector: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sector",
          default: null,
        },
      },
      secondSection: {
        title: { type: String },
        description: { type: String },
        image: { type: String },
        imageAlt: { type: String },
        items: [{
          title: { type: String }
        }]
      },
      thirdSection: {
        items: [
          {
            image: { type: String },
            imageAlt: { type: String },
            video: { type: String },
          },
        ],
      }
    },
  ],
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
