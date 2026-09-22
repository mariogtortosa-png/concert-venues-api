CREATE TABLE venues(
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    street VARCHAR(200),
    city VARCHAR(100) NOT NULL,
    country VARCHAR(2) DEFAULT 'ES',
    capacity INTEGER NOT NULL,
    backline TEXT[],
    phone VARCHAR(20),
    email VARCHAR(150),
    logo_url TEXT,
    conditions_pdf_url TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT NOW()
    );

CREATE TABLE venue_photos (
  id SERIAL PRIMARY KEY,
  venue_id INTEGER REFERENCES venues(id),
  url TEXT NOT NULL,
  alt VARCHAR(200),
  UNIQUE(venue_id, url)
);

