import { useEffect, useState } from "react";
import type { Venue } from "./interfaces";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState<Venue[]>([]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(
          `http://localhost:3000/venues?q=${search}`,
        );
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Error encontrado: " + error);
      }
    }
    fetchVenues();
  }, [search]);

  //meter un debounce para no lanzar peticiones a lo loco

  return (
    <>
      <div className="nav-bar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Busca salas..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
       <div className="venueTable">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>País</th>
                <th>Aforo</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id}>
                  <td>{venue.name}</td>
                  <td>{`${venue.street} - (${venue.city})`}</td>
                  <td>{venue.country}</td>
                  <td>{venue.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
}

export default App;
