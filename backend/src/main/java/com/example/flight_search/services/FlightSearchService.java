package com.example.flight_search.services;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.flight_search.models.FlightDetails;
import com.example.flight_search.models.FlightSearchModel;
import com.example.flight_search.models.FlightSegmentDetails;
import com.example.flight_search.repositories.AmadeusRepository;

@Service
public class FlightSearchService {

    @Autowired
    private AmadeusRepository amadeusRepository;

    public Object searchAirports(String keyword) {
        return amadeusRepository.fetchAirports(keyword);
    }

    public List<FlightDetails> searchFlights(FlightSearchModel request) throws JSONException {
        // Validate dates
        if (request.getDepartureDate().isBefore(request.getCurrentDate())) {
            throw new IllegalArgumentException("Departure date cannot be in the past.");
        }
        if (request.getReturnDate() != null && request.getReturnDate().isBefore(request.getDepartureDate())) {
            throw new IllegalArgumentException("Return date cannot be earlier than departure date.");
        }

        Object apiResponse = amadeusRepository.fetchFlights(request);
        return parseFlightResponse(apiResponse, request.getCurrency());
    }

    private List<FlightDetails> parseFlightResponse(Object apiResponse, String currency) throws JSONException {
        JSONObject responseJson;
        try {
            responseJson = new JSONObject(apiResponse.toString());
        } catch (JSONException e) {
            throw new RuntimeException("Failed to parse API response to JSON", e);
        }
        JSONArray flights = responseJson.getJSONArray("data");
        JSONObject dictionaries = responseJson.getJSONObject("dictionaries");

        List<FlightDetails> flightDetailsList = new ArrayList<>();

        for (int i = 0; i < flights.length(); i++) {
            JSONObject flight = flights.getJSONObject(i);
            JSONArray itineraries = flight.getJSONArray("itineraries");
            JSONObject price = flight.getJSONObject("price");
            JSONArray travelerPricings = flight.getJSONArray("travelerPricings");

            for (int j = 0; j < itineraries.length(); j++) {
                JSONObject itinerary = itineraries.getJSONObject(j);
                JSONArray segments = itinerary.getJSONArray("segments");

                FlightDetails details = new FlightDetails();
                details.setTotalPrice(price.getString("total"));
                details.setCurrency(currency);
                details.setPricePerTraveler(travelerPricings.getJSONObject(0).getJSONObject("price").getString("total"));

                List<FlightSegmentDetails> segmentDetailsList = new ArrayList<>();
                Duration totalDuration = Duration.ZERO;

                for (int k = 0; k < segments.length(); k++) {
                    JSONObject segment = segments.getJSONObject(k);
                    FlightSegmentDetails segmentDetails = new FlightSegmentDetails();

                    segmentDetails.setDepartureAirport(segment.getJSONObject("departure").getString("iataCode"));
                    segmentDetails.setArrivalAirport(segment.getJSONObject("arrival").getString("iataCode"));
                    segmentDetails.setDepartureTime(segment.getJSONObject("departure").getString("at"));
                    segmentDetails.setArrivalTime(segment.getJSONObject("arrival").getString("at"));
                    segmentDetails.setCarrierCode(segment.getString("carrierCode"));
                    segmentDetails.setOperatingCarrierCode(segment.optJSONObject("operating") != null
                            ? segment.getJSONObject("operating").getString("carrierCode")
                            : null);

                    Duration segmentDuration = Duration.parse(segment.getString("duration"));
                    totalDuration = totalDuration.plus(segmentDuration);

                    segmentDetailsList.add(segmentDetails);

                    if (k > 0) {
                        // Calculate layover time
                        LocalDateTime previousArrival = LocalDateTime.parse(
                                segments.getJSONObject(k - 1).getJSONObject("arrival").getString("at"),
                                DateTimeFormatter.ISO_DATE_TIME);
                        LocalDateTime currentDeparture = LocalDateTime.parse(
                                segment.getJSONObject("departure").getString("at"),
                                DateTimeFormatter.ISO_DATE_TIME);
                        Duration layoverDuration = Duration.between(previousArrival, currentDeparture);
                        details.addLayover(segment.getJSONObject("departure").getString("iataCode"), layoverDuration);
                    }
                }

                details.setSegments(segmentDetailsList);
                details.setTotalDuration(totalDuration);
                flightDetailsList.add(details);
            }
        }

        return flightDetailsList;
    }
}
