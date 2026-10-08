import { useEffect, useState } from "react";

interface RegisterFormProps {
  onClose: () => void;
  onCreated: () => void;
}

function RegisterForm({ onClose, onCreated }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [capacity, setCapacity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState("");
  const [geoMsg, setGeoMsg] = useState("");

  /*FUNCIÓN PARA GEOCODIFICAR COORDENADAS DE DIRECCIÓN DADA*/
  function handleGeocode() {
    setGeoMsg("");
    /*si calle o ciudad están vacías no se ejecuta el resto*/
    if (!street.trim() || !city.trim() || !country.trim()) {
      return;
    }
    /*si el mapa no está cargado todavía no se ejecuta*/
    if (!window.google?.maps) {
      setGeoMsg("Mapa cargando, espera unos segundos");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: `${street}, ${city}, ${country}` },
      (results, status) => {
        if (status === "OK" && results?.[0]) {
          const loc = results[0].geometry.location;
          setLatitude(String(loc.lat()));
          setLongitude(String(loc.lng()));
          setGeoMsg("Coordenadas encontradas, revísalas antes de guardar");
        } else if (status === "ZERO_RESULTS") {
          setGeoMsg("Sin resultados para esa dirección");
        } else if (status === "OVER_QUERY_LIMIT") {
          setGeoMsg("Cuota excedida, prueba más tarde");
        } else {
          setGeoMsg("No se pudo geocodificar (" + status + ")");
        }
      },
    );
  }
  /*USE EFFECT QUE DISPARA LA GEOLOCALIZACIÓN TRAS 800MS
DE QUE EL USUARIO TERMINE DE RELLENAR LOS CAMPOS 
CALLE, CIUDAD Y PAÍS */
  useEffect(() => {
    if (!street.trim() || !city.trim() || !country.trim()) return;
    const t = setTimeout(() => handleGeocode(), 800);
    return () => clearTimeout(t);
  }, [street, city, country]);

  /*FUNCIÓN DISPARADA TRAS ENVIAR FORMULARIO*/
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setSuccess("");

    const frontErrs: string[] = [];
    const cap = Number(capacity);
    const lat = Number(latitude);
    const long = Number(longitude);

    if (!name.trim()) {
      frontErrs.push("El nombre de la sala no puede estar vacío");
    }
    if (!street.trim()) {
      frontErrs.push("La calle no puede estar vacía");
    }
    if (!city.trim()) {
      frontErrs.push("La ciudad no puede estar vacía");
    }
    if (!Number.isInteger(cap) || cap <= 0) {
      frontErrs.push("El aforo ha de ser entero y mayor de cero");
    }

    if (!latitude.trim()) {
      frontErrs.push("La latitud no puede estar vacía");
    } else if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
      frontErrs.push("Latitud incorrecta");
    }
    if (!longitude.trim()) {
      frontErrs.push("La longitud no puede estar vacía");
    } else if (!Number.isFinite(long) || long < -180 || long > 180) {
      frontErrs.push("Longitud incorrecta");
    }

    if (frontErrs.length > 0) {
      setErrors(frontErrs);
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/venues`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        street,
        city,
        capacity: cap,
        phone: phone || null,
        email: email || null,
        latitude: lat,
        longitude: long,
      }),
    });

    /*SI LA RESPUESTA NO ES OK POR PARTE DEL SERVIDOR*/
    if (!res.ok) {
      const data = await res.json();
      setErrors(data.error ?? ["Error al crear"]);
      return;
    }

    /*DEVUELVE MENSAJE DE CREACIÓN EXITOSA ANTES DE CERRAR LA VENTANA*/
    const created = await res.json();
    setSuccess(`Sala ${created.name} creada con éxito`);
    setTimeout(() => {
      onCreated();
      onClose();
    }, 1200);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {success && <p className="form-success">{success}</p>}
        {errors.length > 0 && (
          <ul className="form-errors">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
        <h2>Registrar Sala</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre*
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Terra Concerts"
            />
          </label>
          <label>
            Calle*
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Calle Rosell, 2"
            />
          </label>
          <label>
            Ciudad*
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Barcelona"
            />
          </label>
          <label>
            País*
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="España"
            />
          </label>
          <label>
            Aforo*
            <input
              type="text"
              inputMode="numeric"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="360"
            />
          </label>
          <label>
            Teléfono
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="685948494"
            />
          </label>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sala@info.com"
            />
          </label>
          {/*CAMPOS NO VISIBLES PARA EL USUARIO PORQUE
          NUNCA LOS VA A RELLENAR A MANO. SOLO PARA DEBUG */}
          {/*   <label>
            Longitud*
            <input
              inputMode="numeric"
              type="text"
              value={longitude}
              placeholder="-6.8731016990822985"
            />
          </label>
          <label>
            Latitud*
            <input
              inputMode="numeric"
              type="text"
              value={latitude}
              placeholder="45.75931329870162"
            />
          </label> */}

          <button type="submit" className="save-btn">
            Guardar
          </button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
