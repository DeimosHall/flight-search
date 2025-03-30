package com.example.flight_search.services;

import com.example.flight_search.models.FlightSearchModel;
import com.example.flight_search.repositories.AmadeusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FlightSearchService {

    @Autowired
    private AmadeusRepository amadeusRepository;

    public Object searchAirports(String keyword) {
        return amadeusRepository.fetchAirports(keyword);
    }

    public Object searchFlights(FlightSearchModel request) {
        // Validate dates
        if (request.getDepartureDate().isBefore(request.getCurrentDate())) {
            throw new IllegalArgumentException("Departure date cannot be in the past.");
        }
        if (request.getReturnDate() != null && request.getReturnDate().isBefore(request.getDepartureDate())) {
            throw new IllegalArgumentException("Return date cannot be earlier than departure date.");
        }

        return amadeusRepository.fetchFlights(request);
    }
}