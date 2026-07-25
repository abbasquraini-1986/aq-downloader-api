import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    service: "AQ Media API"
  });
});

app.post("/download", (req, res) => {
  res.json({
    success: true,
    message: "Download endpoint reached",
    body: req.body
  });
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});