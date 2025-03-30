import { FlightSearchParams } from "../types";

export const BASE_URL = 'http://localhost:9090/';
const flightsEndpoint = "flights";
const headers = {
  "Content-Type": "application/json",
};

export const flights = {
  async getAll(flightSearchParams: FlightSearchParams) {
    const response = await fetch(`${BASE_URL}${flightsEndpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(flightSearchParams),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
}
