import "dotenv/config";
import express from "express";
import { pool } from "./db.js";
import { venuesRouter } from "./venues.routes.js";
import cors from "cors";

//Variables
const app = express();
const PORT = 3000;

app.use(cors());

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "ok", database: "disconnected" });
  }
});

app.use("/venues", venuesRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando por el puerto ${PORT}`);
});
