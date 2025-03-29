package com.example.flight_search.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FlightSearchController {

    final String AMADEUS_API_KEY = System.getenv("AMADEUS_API_KEY");
    final String AMADEUS_API_SECRET = System.getenv("AMADEUS_API_SECRET");

    @GetMapping("/health")
    public String healthCheck() {
        return "Ok";
    }
}
