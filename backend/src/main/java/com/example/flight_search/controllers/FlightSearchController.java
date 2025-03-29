package com.example.flight_search.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FlightSearchController {

    @GetMapping("/health")
    public String healthCheck() {
        return "Ok";
    }
}
