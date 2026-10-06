import { pool } from "./db";

export async function getAllVenues() {
  const result = await pool.query("SELECT * from venues");
  return result.rows;
}
/* QUERY PARA DEVOLVER SALAS POR ID */
export async function getVenueById(id: string) {
  const result = await pool.query("SELECT * from venues WHERE id=$1", [id]);
  return result.rows[0];
}

/* QUERY DEL BUSCADOR, FITLRA POR NOMBRE/ CIUDAD/ CALLE */

export async function getVenueSearch(search: string) {
  const pattern = `%${search}%`;
  const result = await pool.query(
    "SELECT * FROM venues WHERE name ILIKE $1 OR city ILIKE $1 OR street ILIKE $1",
    [pattern],
  );
  return result.rows;
}

export async function createVenue(data: {
  name: string;
  street: string;
  city: string;
  capacity: number;
  phone: string | null;
  email: string | null;
  latitude: number;
  longitude: number;
}) {
  const result = await pool.query(
    "INSERT INTO venues (name, street, city, capacity, phone, email, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
    [
      data.name,
      data.street,
      data.city,
      data.capacity,
      data.phone ?? null,
      data.email ?? null,
      data.latitude,
      data.longitude,
    ],
  );
  return result.rows[0];
}

export async function deleteVenue(id: string) {
  const result = await pool.query(
    "DELETE FROM venues WHERE id=$1 RETURNING *",
    [id],
  );
  return result.rows[0];
}
