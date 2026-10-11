import Box from "../models/box.model.js";

export async function createBox(req, res) {
  try {
    const box = await Box.create(req.body);
    return res.status(201).json({ success: true, message: "Box created successfully", box });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export async function getBoxes(_req, res) {
  try {
    const boxes = await Box.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, boxes });
  } catch {
    return res.status(500).json({ success: false, message: "Failed to fetch boxes" });
  }
}
