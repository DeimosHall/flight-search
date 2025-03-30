export interface FlightSearchParams {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate?: string;  // Optional
  currency: string;
  nonStop: boolean;
  adults: number;
}
