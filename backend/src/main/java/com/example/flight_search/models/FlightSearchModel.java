package com.example.flight_search.models;

import java.time.LocalDate;

public class FlightSearchModel {
    private String departureAirport;
    private String arrivalAirport;
    private LocalDate departureDate;
    private LocalDate returnDate;
    private int adults;
    private String currency;
    private boolean nonStop;

    public FlightSearchModel(String departureAirport, String arrivalAirport, LocalDate departureDate, LocalDate returnDate, int adults, String currency, boolean nonStop) {
        if (adults < 1 || adults > 9) {
            throw new IllegalArgumentException("The number of adults must be between 1 and 9. You provided: " + adults);
        }
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.adults = adults;
        this.currency = currency;
        this.nonStop = nonStop;
    }

    public String getDepartureAirport() {
        return departureAirport;
    }

    public void setDepartureAirport(String departureAirport) {
        this.departureAirport = departureAirport;
    }

    public String getArrivalAirport() {
        return arrivalAirport;
    }

    public void setArrivalAirport(String arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public int getAdults() {
        return adults;
    }

    public void setAdults(int adults) {
        this.adults = adults;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public boolean isNonStop() {
        return nonStop;
    }

    public void setNonStop(boolean nonStop) {
        this.nonStop = nonStop;
    }

    public LocalDate getCurrentDate() {
        return LocalDate.now();
    }

    @Override
    public String toString() {
        return "FlightSearchModel{" +
                "departureAirport='" + departureAirport + '\'' +
                ", arrivalAirport='" + arrivalAirport + '\'' +
                ", departureDate=" + departureDate +
                ", returnDate=" + returnDate +
                ", adults=" + adults +
                ", currency='" + currency + '\'' +
                ", nonStop=" + nonStop +
                '}';
    }
}
