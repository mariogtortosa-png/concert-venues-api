import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import type { Venue } from "../interfaces";

interface VenueMapProps {
  venues: Venue[];
}

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

/* CENTRO POR DEFECTO SITUADO EN ESPAÑA */
const defaultCenter = {
  lat: 40.4168,
  lng: -3.7038,
};

function VenueMap({ venues }: VenueMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  /*   DEVUELVE UN MENSAJE DE CARGA MIENTRAS EL COMPONENTE SE RENDERIZA */
  if (!isLoaded) return <p>Cargando mapa...</p>;

  /*   GUARDA LAS SALAS FILTRADAS SOLO POR LAS QUE TIENEN LAS COORDENADAS PARA EVITAR FALLOS
  Y LE DICE A TYPESCRIPT QUE LATITUDE Y LONGITUDE SERÁN NUMBER Y NO NULL */
  const venuesWithCoords = venues.filter(
    (venue): venue is Venue & { latitude: number; longitude: number } =>
      venue.latitude !== null && venue.longitude !== null,
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={8}
    >
      {venuesWithCoords.map((venue) => (
        <MarkerF
          key={venue.id}
          position={{ lat: venue.latitude, lng: venue.longitude }}
        ></MarkerF>
      ))}
    </GoogleMap>
  );
}

export default VenueMap;
