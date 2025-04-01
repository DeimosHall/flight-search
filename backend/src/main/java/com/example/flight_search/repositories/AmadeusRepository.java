package com.example.flight_search.repositories;

import com.example.flight_search.models.FlightSearchModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Repository
public class AmadeusRepository {

    @Value("${amadeus.api.auth}")
    private String authUrl;

    @Value("${amadeus.api.flights}")
    private String flightsUrl;

    @Value("${amadeus.api.airport}")
    private String airportUrl;

    @Value("${amadeus.api.key}")
    private String apiKey;

    @Value("${amadeus.api.secret}")
    private String apiSecret;

    private String accessToken;

    private final RestTemplate restTemplate = new RestTemplate();

    public void authenticate() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Use LinkedMultiValueMap to encode form data
        LinkedMultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");
        body.add("client_id", apiKey);
        body.add("client_secret", apiSecret);

        HttpEntity<LinkedMultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(authUrl, request, Map.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            accessToken = (String) response.getBody().get("access_token");
        }
    }

    public Object fetchAirports(String keyword) {
        authenticate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        String url = airportUrl + "keyword=" + keyword;

        HttpEntity<Void> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);

        return response.getBody();
    }

    public Object fetchFlights(FlightSearchModel request) {
        authenticate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        String url = flightsUrl +
                "originLocationCode=" + request.getDepartureAirport() +
                "&destinationLocationCode=" + request.getArrivalAirport() +
                "&departureDate=" + request.getDepartureDate() +
                (request.getReturnDate() != null ? "&returnDate=" + request.getReturnDate() : "") +
                "&adults=" + request.getAdults() +
                "&currencyCode=" + request.getCurrency() +
                "&nonStop=" + request.isNonStop();

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);

        return response.getBody();
    }
}