import { useEffect, useState } from "react";
import type { Venue } from "./interfaces";
//import VenueTable from "./components/VenuesTables";
import VenueMap from "./components/VenuesMap";
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
      {/* BARRA DE NAVEGACIÓN CON BUSCADOR */}
      <div className="app-layout">
        <nav className="nav-bar">
          <div className="brand">MUSIC VENUE MAP APPLICATION</div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Tables</a>
          </div>
          <button className="register-btn">Registrar Sala</button>
        </nav>
        <main className="map-wrapper">
          <VenueMap
            venues={venues}
            search={search}
            onSearchChange={handleSearch}
          />
        </main>
      </div>
      {/* <div className="nav-bar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Busca salas..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div> */}

      {/* COMPONENTE PARA PINTAR LOS DATOS EN UNA TABLA */}
      {/* <VenueTable venues={venues} /> */}
    </>
  );
}

export default App;
