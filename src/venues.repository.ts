import { pool } from "./db";

export async function getAllVenues() {
  const result = await pool.query("SELECT * from venues");
  return result.rows;
}

export async function getVenueById(id: string) {
  const result = await pool.query("SELECT * from venues WHERE id=$1", [id]);
  return result.rows[0];
}
