import { Router } from "express";
import { getAllVenues } from "./venues.repository";
import { getVenueById } from "./venues.repository";

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

venuesRouter.get("/:id", async (req, res) => {
  try {
    const venuesById = await getVenueById(req.params.id);

    if (!venuesById) {
      return res.status(404).json({ error: "Sala no encontrada" });
    }
    return res.json(venuesById);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Fallo en la conexión con la base de datos" });
  }
});
