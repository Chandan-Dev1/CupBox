import Link from "../models/link.model.js";
import { generateShortCode } from "../services/shortCode.service.js";
import { validateUrl } from "../validators/link.validator.js";

export async function createShortLink(req, res) {
  try {
    const { url } = req.body;
    const validation = validateUrl(url);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    let shortCode;

    do {
      shortCode = generateShortCode();
    } while (await Link.exists({ shortCode }));

    const link = await Link.create({
      originalUrl: validation.url,
      shortCode
    });

    return res.status(201).json({
      success: true,
      id: link._id,
      code: link.shortCode,
      shortUrl: `http://localhost:3000/${link.shortCode}`,
      originalUrl: link.originalUrl
    });
  } catch (error) {
    console.error("Create short link error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
}

export async function redirectToOriginalUrl(req, res) {
  try {
    const { code } = req.params;

    const link = await Link.findOne({ shortCode: code });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found"
      });
    }

    await Link.updateOne(
      { _id: link._id },
      { $inc: { clickCount: 1 } }
    );

    return res.redirect(302, link.originalUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
}

export async function getAllLinks(req, res) {
  try {
    const links = await Link.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("originalUrl shortCode clickCount createdAt");

    const formattedLinks = links.map((link) => ({
      id: link._id,
      code: link.shortCode,
      originalUrl: link.originalUrl,
      clickCount: link.clickCount,
      createdAt: link.createdAt
    }));

    return res.status(200).json({
      success: true,
      links: formattedLinks
    });
  } catch (error) {
    console.error("Get links error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
}
