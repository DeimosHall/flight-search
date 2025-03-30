package com.example.flight_search.models;

import java.time.Duration;

public class Layover {
    private String airportCode;
    private Duration duration;

    public Layover(String airportCode, Duration duration) {
        this.airportCode = airportCode;
        this.duration = duration;
    }

    public String getAirportCode() {
        return airportCode;
    }

    public void setAirportCode(String airportCode) {
        this.airportCode = airportCode;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }
}
