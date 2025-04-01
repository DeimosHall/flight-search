package com.example.flight_search.models;

public class FlightSegmentDetails {

    private String departureAirport;
    private String arrivalAirport;
    private String departureTime;
    private String arrivalTime;
    private String carrierCode;
    private String operatingCarrierCode;

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

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getCarrierCode() {
        return carrierCode;
    }

    public void setCarrierCode(String carrierCode) {
        this.carrierCode = carrierCode;
    }

    public String getOperatingCarrierCode() {
        return operatingCarrierCode;
    }

    public void setOperatingCarrierCode(String operatingCarrierCode) {
        this.operatingCarrierCode = operatingCarrierCode;
    }

    @Override
    public String toString() {
        return "FlightSegmentDetails{" +
                "departureAirport='" + departureAirport + '\'' +
                ", arrivalAirport='" + arrivalAirport + '\'' +
                ", departureTime='" + departureTime + '\'' +
                ", arrivalTime='" + arrivalTime + '\'' +
                ", carrierCode='" + carrierCode + '\'' +
                ", operatingCarrierCode='" + operatingCarrierCode + '\'' +
                '}';
    }
}
