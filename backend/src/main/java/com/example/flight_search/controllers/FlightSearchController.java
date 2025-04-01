package com.example.flight_search.controllers;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.flight_search.models.FlightSearchModel;
import com.example.flight_search.services.FlightSearchService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:8080")
public class FlightSearchController {
    
    @Autowired
    private FlightSearchService flightSearchService;

    @GetMapping("/health")
    public String healthCheck() {
        return "Ok";
    }

    @GetMapping("/airports")
    public ResponseEntity<?> searchAirports(@RequestParam String keyword) {
        return ResponseEntity.ok(flightSearchService.searchAirports(keyword));
    }

    @PostMapping("/flights")
    public ResponseEntity<?> searchFlights(@RequestBody FlightSearchModel request) throws JSONException {
        return ResponseEntity.ok(flightSearchService.searchFlights(request));
    }
}
