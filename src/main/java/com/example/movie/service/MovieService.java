package com.example.movie.service;

import com.example.movie.model.Movie;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieService {
    private final String apiKey ="48d5017";

    public Movie getMovieByTitle(String title) {
        String url = "http://www.omdbapi.com/?t=" + title + "&apikey=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, Movie.class);
    }
}