import { useEffect, useState } from "react";
import type { Venue } from "./interfaces";
//import VenueTable from "./components/VenuesTables";
import VenueMap from "./components/VenuesMap";
import "./App.css";

function App() {
  /* USE STATES */
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState<Venue[]>([]);

  /* FUNCIÓN PARA CONTROLAR LA BUSQUEDA */
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  /* USE EFFECT PARA ACTUALIZAR LAS SALAS QUE SE MUESTRAN AL BUSCAR */
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

    /* ESTE IF CONTROLA QUE NO SE LANZE UNA BUSQUEDA CUANDO LA BARRA QUEDA VACÍA */
    if (!search) {
      fetchVenues();
      return;
    }

    /* EL TIMEOUT CONTROLA QUE NO SE LANCEN PETICIONES EN CADA PULSACIÓN DE TECLA
    Y SOLO LAS LANZA CUANDO PASAN 300MS */
    const timeoutId = setTimeout(() => {
      fetchVenues();
    }, 400);

    /* EL RETURN LIMPIA EL COMPONENTE EN CADA NUEVA PULSACIÓN DE TECLA
    REINICIANDO EL CONTADOR DEL TIMEOUT A 0 */
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <>
      {/* BARRA DE NAVEGACIÓN CON BUSCADOR */}
      <div className="app-layout">
        <nav className="nav-bar">
          <div className="brand">
            MUSIC VENUE MAP <br />
            APPLICATION
          </div>
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

      {/* COMPONENTE PARA PINTAR LOS DATOS EN UNA TABLA */}
      {/* <VenueTable venues={venues} /> */}
    </>
  );
}

export default App;
