import { Router } from "express";
import { ProviderManager } from "../services/providerManager";

const router = Router();
const manager = new ProviderManager();

router.post("/", async (req, res) => {

  const { url, format } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "Missing url"
    });
  }

  try {

    const result = await manager.download(url, format);

    return res.json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    });

  }

});

export default router;