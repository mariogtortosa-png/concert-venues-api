import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import type { Venue } from "../interfaces";
import { useState } from "react";
import "../App.css";
import TechnicalRider from "./TechnicalRider";

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
    mapTypeControl: false,
    disableDefaultUI: true,
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  /* VARIABLES QUE CONTROLAN EL ESTILO DEL PIN DE CADA SALA, 
  CAMBIA SU COLOR EN FUNCIÓN DEL AFORO DE LA SALA */

  const markerIconSmall = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: "#e63946",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 2,
  };

  const markerIconMedium = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: "#cdd236",
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
  const markerIconStadium = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: "#2d81e1",
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

  const contactInfo = selectedVenue
    ? [selectedVenue.phone, selectedVenue.email].filter(Boolean).join(" - ")
    : "";

  /* FUNCIÓN PARA COMPROBAR EL TAMAÑO DE SALA Y 
    DEVOLVER UN COLOR DE PIN ACORDE */
  function getSizeColour(venue: Venue) {
    if (venue.capacity >= 10000) {
      return markerIconStadium;
    } else if (venue.capacity >= 1000) {
      return markerIconBig;
    } else if (venue.capacity >= 400) {
      return markerIconMedium;
    } else {
      return markerIconSmall;
    }
  }

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
            icon={getSizeColour(venue)}
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
          {selectedVenue.logo_url && (
            <img
              src={selectedVenue.logo_url}
              alt={`Logo de ${selectedVenue.name}`}
              className="venue-logo"
            />
          )}
          <h3>{selectedVenue.name}</h3>
          <p>
            {selectedVenue.street} <br /> ({selectedVenue.city})
          </p>
          <p>Aforo: {selectedVenue.capacity}</p>

          {contactInfo && <p> Contacto: {contactInfo}</p>}
          {selectedVenue.technical_rider && (
            <TechnicalRider data={selectedVenue.technical_rider}/>
          )}
          {selectedVenue.conditions_pdf_url && (
            <a href={selectedVenue.conditions_pdf_url} target="_blank">
              Condiciones de sala
            </a>
          )}
        </div>
      )}
    </div>
  );
}
export default VenueMap;

/* 
const contactInfo = [selectedVenue.phone, selectedVenue.email].filter(Boolean).join(" - ") */
