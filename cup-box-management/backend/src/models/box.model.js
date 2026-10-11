import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  length: { type: Number, required: true, min: 0.1 },
  width: { type: Number, required: true, min: 0.1 },
  height: { type: Number, required: true, min: 0.1 },
  stock: {
    type: Number, required: true, min: 0, default: 0,
    validate: { validator: Number.isInteger, message: "Stock must be a whole number" }
  },
  price: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export default mongoose.model("Box", boxSchema);
