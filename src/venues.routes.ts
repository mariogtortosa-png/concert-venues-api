import { Router } from "express";
import { getAllVenues } from "./venues.repository";

export const venuesRouter = Router();

venuesRouter.get("/", async (req, res) => {
  try {
    const venues = await getAllVenues();
    res.json(venues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fallo con la conexión a la base de datos" });
  }
});
