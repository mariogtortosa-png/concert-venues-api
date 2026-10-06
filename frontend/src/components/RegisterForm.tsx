import { useState } from "react";

interface RegisterFormProps {
  onClose: () => void;
  onCreated: () => void;
}

function RegisterForm({ onClose, onCreated }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [capacity, setCapacity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setSuccess("");

    const res = await fetch("http://localhost:3000/venues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        street,
        city,
        capacity: Number(capacity),
        phone: phone || null,
        email: email || null,
        latitude: Number(latitude),
        longitude: Number(longitude),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setErrors(data.error ?? ["Error al crear"]);
      return;
    }

  
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
          <label>
            Longitud*
            <input
              inputMode="numeric"
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="-6.8731016990822985"
            />
          </label>
          <label>
            Latitud*
            <input
              inputMode="numeric"
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="45.75931329870162"
            />
          </label>

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
