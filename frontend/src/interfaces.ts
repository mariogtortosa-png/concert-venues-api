export interface Venue {
  id: number;
  name: string;
  street: string;
  city: string;
  country: string;
  capacity: number;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  conditions_pdf_url: string | null;
  technical_rider: Record<string, unknown> | null;
  latitude: number | null;
  longitude: number | null;
}
