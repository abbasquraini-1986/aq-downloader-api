import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import downloadRoute from "./routes/download";
import infoRoute from "./routes/info";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/info", infoRoute);    

app.use("/download", downloadRoute);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    service: "AQ Downloader API",
    version: "1.0.0"
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const port = Number(process.env.PORT) || 3000;



app.listen(port, () => {
  console.log(`🚀 AQ Downloader API running on port ${port}`);
});