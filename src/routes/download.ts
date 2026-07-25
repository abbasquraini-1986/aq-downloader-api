import { Router } from "express";
import { ProviderManager } from "../services/providerManager";

console.log("========================================");
console.log("✅ DOWNLOAD ROUTE LOADED");
console.log("========================================");

const router = Router();
const manager = new ProviderManager();

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