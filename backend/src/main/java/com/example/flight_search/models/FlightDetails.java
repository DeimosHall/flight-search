package com.example.flight_search.models;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class FlightDetails {
    private String totalPrice;
    private String currency;
    private String pricePerTraveler;
    private List<FlightSegmentDetails> segments = new ArrayList<>();
    private Duration totalDuration;
    private List<Layover> layovers = new ArrayList<>();

    public void addLayover(String airportCode, Duration duration) {
        Layover layover = new Layover(airportCode, duration);
        this.layovers.add(layover);
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPricePerTraveler() {
        return pricePerTraveler;
    }

    public void setPricePerTraveler(String pricePerTraveler) {
        this.pricePerTraveler = pricePerTraveler;
    }

    public List<FlightSegmentDetails> getSegments() {
        return segments;
    }

    public void setSegments(List<FlightSegmentDetails> segments) {
        this.segments = segments;
    }

    public Duration getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(Duration totalDuration) {
        this.totalDuration = totalDuration;
    }

    public List<Layover> getLayovers() {
        return layovers;
    }

    public void setLayovers(List<Layover> layovers) {
        this.layovers = layovers;
    }

    @Override
    public String toString() {
        return "FlightDetails{" +
                "totalPrice='" + totalPrice + '\'' +
                ", currency='" + currency + '\'' +
                ", pricePerTraveler='" + pricePerTraveler + '\'' +
                ", segments=" + segments +
                ", totalDuration='" + totalDuration + '\'' +
                ", layovers=" + layovers +
                '}';
    }
}
