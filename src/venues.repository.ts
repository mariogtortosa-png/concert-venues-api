import { pool } from "./db";

export async function getAllVenues() {
  const result = await pool.query("SELECT * from venues");
  return result.rows;
}

export async function getVenueById(id: string) {
  const result = await pool.query("SELECT * from venues WHERE id=$1", [id]);
  return result.rows[0];
}

export async function getVenueSearch(search: string) {
  const pattern = `%${search}%`;
  const result = await pool.query("SELECT * FROM venues WHERE name ILIKE $1 OR city ILIKE $1 OR street ILIKE $1", [pattern]);
  return result.rows;
}
