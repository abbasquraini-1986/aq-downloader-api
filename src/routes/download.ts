import { Router } from "express";
import { ProviderManager } from "../services/providerManager";

const router = Router();
const manager = new ProviderManager();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "Missing url"
    });
  }

  const result = await manager.download(url);

  return res.json(result);
});

export default router;