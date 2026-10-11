import Cup from "../models/cup.model.js";

export async function createCup(req, res) {
  try {
    const cup = await Cup.create(req.body);
    return res.status(201).json({ success: true, message: "Cup created successfully", cup });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export async function getCups(_req, res) {
  try {
    const cups = await Cup.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, cups });
  } catch {
    return res.status(500).json({ success: false, message: "Failed to fetch cups" });
  }
}
