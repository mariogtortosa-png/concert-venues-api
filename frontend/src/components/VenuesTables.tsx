import type { Venue } from "../interfaces";

interface venueTableProps {
  venues: Venue[];
}


//PINTA UNA TABLA CON ALGUNOS DATOS DE LAS SALAS

function VenueTable({ venues }: venueTableProps) {
  return (
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
  );
}

export default VenueTable;
