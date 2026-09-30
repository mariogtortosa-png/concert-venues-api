export interface Venue {
  id: number;
  name: string;
  street: string;
  city: string;
  country: string;
  capacity: number;
  phone: string;
  email: string;
  latitude: number | null;
  longitude: number | null
}
