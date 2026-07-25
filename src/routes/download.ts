import { Router } from "express";
import { ProviderManager } from "../services/providerManager";

console.log("========================================");
console.log("✅ DOWNLOAD ROUTE LOADED");
console.log("========================================");

const router = Router();
const manager = new ProviderManager();

/**
 * @openapi
 * /download:
 *   post:
 *     summary: Download media
 *     description: Extract media information and a direct download URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *               format:
 *                 type: string
 *                 example: 18
 *     responses:
 *       200:
 *         description: Download information returned successfully.
 *       400:
 *         description: Missing URL.
 *       500:
 *         description: Internal server error.
 */

router.use((req, _res, next) => {
  console.log(`➡ DOWNLOAD ROUTE HIT: ${req.method} ${req.originalUrl}`);
  next();
});

router.post("/", async (req, res) => {
  console.log("📥 Request body:", req.body);

  const { url, format } = req.body;

  if (!url) {
    console.log("❌ Missing URL");

    return res.status(400).json({
      success: false,
      error: "Missing url"
    });
  }

  try {
    console.log(`🚀 Processing: ${url}`);

    const result = await manager.download(url, format);

    console.log("✅ Download completed");

    return res.json(result);

  } catch (error) {
    console.error("❌ Download failed:", error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;