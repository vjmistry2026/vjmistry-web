import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  firstSection: {
    items: [{
      title: String,
      image: String,
      imageAlt: String,
      name: String,
      designation: String,
      message: String
    }]
  },
  secondSection: {
    title: String,
    items: [{
      title: String,
      image: String,
      imageAlt: String,
      description: String
    }]
  },
  thirdSection: {
    image: String,
    imageAlt: String,
    title: String,
    buttonText: String,
    buttonLink: String
  }
});

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;