import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

//import { swaggerSpec } from "./config/swagger";
//import downloadRoute from "./routes/download";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//app.use(
  //"/docs",
  //swaggerUi.serve,
 // swaggerUi.setup(swaggerSpec)
//);

//app.use("/download", downloadRoute);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    service: "AQ Media API",
    version: "2.0.0"
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
  console.log(`🚀 AQ Media API running on port ${port}`);
  console.log(`📘 Swagger UI: http://localhost:${port}/docs`);
});