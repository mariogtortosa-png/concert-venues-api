import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import type { Venue } from "../interfaces";
import { useState } from "react";
import "../App.css";

interface VenueMapProps {
  venues: Venue[];
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

/* CENTRO POR DEFECTO SITUADO EN ESPAÑA */
const defaultCenter = {
  lat: 40.4168,
  lng: -3.7038,
};

function VenueMap({ venues, search, onSearchChange }: VenueMapProps) {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  /*   DEVUELVE UN MENSAJE DE CARGA MIENTRAS EL COMPONENTE SE RENDERIZA */
  if (!isLoaded) return <p>Cargando mapa...</p>;

  /*   VARIABLE PARA OCULTAR PUNTOS DE INTERÉS COMERCIAL DE GOOGLE */
  const mapOptions: google.maps.MapOptions = {
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  /* ICONO QUE MUESTRA EL MAPA EN CADA SALA */
  const markerIconSmall = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: "#e63946",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 2,
  };

  const markerIconBig = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: "#2faa6b",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 2,
  };

  /*   GUARDA LAS SALAS FILTRADAS SOLO POR LAS QUE TIENEN LAS COORDENADAS PARA EVITAR FALLOS
  Y LE DICE A TYPESCRIPT QUE LATITUDE Y LONGITUDE SERÁN NUMBER Y NO NULL */
  const venuesWithCoords = venues.filter(
    (venue): venue is Venue & { latitude: number; longitude: number } =>
      venue.latitude !== null && venue.longitude !== null,
  );

  return (
    <div className="map-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar salas..."
        value={search}
        onChange={onSearchChange}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={8}
        options={mapOptions}
        onClick={() => setSelectedVenue(null)}
      >
        {venuesWithCoords.map((venue) => (
          <MarkerF
            key={venue.id}
            position={{ lat: venue.latitude, lng: venue.longitude }}
            icon={venue.capacity >= 1000 ? markerIconBig : markerIconSmall}
            onClick={(e) => {
              e.domEvent.stopPropagation();
              setSelectedVenue(venue);
            }}
          ></MarkerF>
        ))}
      </GoogleMap>
      {/*       FICHA DE INFORMACIÓN CUANDO SE CLICA UNA SALA */}
      {selectedVenue && (
        <div className="info-card">
          <button className="close-btn" onClick={() => setSelectedVenue(null)}>
            X
          </button>
          <h3>{selectedVenue.name}</h3>
          <p>
            {selectedVenue.street} - ({selectedVenue.city})
          </p>
        </div>
      )}
    </div>
  );
}

export default VenueMap;
