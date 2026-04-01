import mongoose from "mongoose";

const equipmentCategorySchema = new mongoose.Schema({
    name: { type: String, required: true }
})

export default mongoose.models.EquipmentCategory || mongoose.model("EquipmentCategory", equipmentCategorySchema);