import { Router } from "express";
import { createVenue, deleteVenue, getAllVenues } from "./venues.repository";
import { getVenueById } from "./venues.repository";
import { getVenueSearch } from "./venues.repository";

export const venuesRouter = Router();

//Función para obtener todas las salas
// o en caso de búsqueda obtener las coincidencias
venuesRouter.get("/", async (req, res) => {
  try {
    const search = req.query.q;

    const venues = search
      ? await getVenueSearch(search.toString())
      : await getAllVenues();
    res.json(venues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fallo con la conexión a la base de datos" });
  }
});

//Ruta para poder usar el id para mostrar una sala concreta
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

/*CREACIÓN DE SALAS EN LA BBDD*/
venuesRouter.post("/", async (req, res) => {
  const { name, street, city, capacity, phone, email, latitude, longitude } =
    req.body;
  const errors: string[] = [];

  /*ARRAY MANUAL DE ERRORES*/
  if (!name || typeof name !== "string") {
    errors.push("El nombre no puede estar vacío y debe ser un texto");
  }
  if (!street || typeof street !== "string") {
    errors.push("La calle no puede estar vacía y debe ser un texto");
  }
  if (!city || typeof city !== "string") {
    errors.push("La ciudad no puede estar vacía y debe ser un texto");
  }
  if (!capacity || typeof capacity !== "number" || !Number.isInteger(capacity) || capacity <= 0) {
    errors.push("El aforo no puede estar vacío y debe ser un número entero mayor de 0");
  }
  if (phone !== undefined && phone !== null && phone !== "") {
    if (typeof phone !== "string") {
      errors.push("El teléfono debe ser un texto");
    }
  }
  if (email !== undefined && email !== null && email !== "") {
    if (typeof email !== "string") {
      errors.push("El email debe ser un texto");
    }
  }
  if (
    latitude === undefined ||
    latitude === null ||
    typeof latitude !== "number" ||
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90
  ) {
    errors.push("Las coordenadas (latitud) son obligatorias");
  }
  if (
    longitude === undefined ||
    longitude === null ||
    typeof longitude !== "number" ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    errors.push("Las coordenadas (longitud) son obligatorias");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }

  /*BLOQUE PARA CREAR LA SALA CON CREATEVENUE*/
  try {
    const create = await createVenue(req.body);
    console.log("Sala creada con éxito " + res.statusCode);
    return res.status(201).location(`/venues/${create.id}`).json(create);
  } catch (e) {
    console.error("Ha habido un error: " + e);
    res.status(500).json({ error: "Error al crear la sala" });
  }
});

venuesRouter.delete("/:id", async (req, res) => {
  try {
    const dltVenue = await deleteVenue(req.params.id);

    /*IF QUE MANEJA EL CASO DE QUE NO EXISTA SALA CON EL ID */
    if (!dltVenue) {
      return res.status(404).json({ error: "Sala no encontrada" });
    }

    /*SI SE ELIMINA LA SALA */
    const deletedVenue = dltVenue.name;
    console.log(`Sala ${deletedVenue} eliminada correctamente`);
    return res.status(200).json({ mensaje: "Sala eliminada correctamente" });
  } catch (e) {
    console.log("Error al eliminar sala " + e);
    res.status(500).json({ error: "Error al eliminar la sala" });
  }
});
