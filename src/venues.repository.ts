import { pool } from "./db";

export async function getAllVenues() {
  const result = await pool.query("SELECT * from venues");
  return result.rows;
}
