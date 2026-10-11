import mongoose from "mongoose";
import Cup from "../models/cup.model.js";
import Box from "../models/box.model.js";
import { calculateCapacity, recommendBoxes } from "../services/capacity.service.js";

export async function getCupCapacity(req, res) {
  try {
    const { cupId, quantity } = req.body;

    if (!mongoose.isValidObjectId(cupId) || !Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Valid cupId and positive integer quantity are required" });
    }

    const cup = await Cup.findById(cupId);
    if (!cup) return res.status(404).json({ success: false, message: "Cup not found" });

    if (cup.stock < quantity) {
      return res.status(400).json({ success: false, message: "Insufficient cup stock", availableStock: cup.stock });
    }

    const boxes = await Box.find();
    const capacities = boxes.map((box) => calculateCapacity(cup, box));
    const { recommendations, unavailableOptions } = recommendBoxes(cup, boxes, quantity);

    return res.status(200).json({
      success: true,
      cup: { id: cup._id, name: cup.name, requestedQuantity: quantity },
      capacities, recommendations, unavailableOptions,
      message: recommendations.length ? "Suitable boxes found" : "No box option has enough stock for this quantity"
    });
  } catch (error) {
    console.error("Capacity calculation error:", error);
    return res.status(500).json({ success: false, message: "Failed to calculate capacity" });
  }
}
