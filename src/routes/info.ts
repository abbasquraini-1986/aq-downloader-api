import { Router } from "express";
import { ProviderManager } from "../services/providerManager";

const router = Router();

const manager = new ProviderManager();

router.post("/", async (req, res) => {

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "URL is required."
    });
  }

  try {

    const result = await manager.download(url);

    res.json(result);

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error instanceof Error
        ? error.message
        : "Unknown error"
    });

  }

});

export default router;