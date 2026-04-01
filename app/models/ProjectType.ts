import mongoose from "mongoose";

const projectTypeSchema = new mongoose.Schema({
    name:{type:String,required:true}
})

export default mongoose.models.ProjectType || mongoose.model("ProjectType", projectTypeSchema);