package com.example.movie.controller;

import com.example.movie.model.Movie;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MovieController {

    private final String API_KEY = "48d5017"; 

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("topMovies", getTopMovies());
        return "index";
    }

    @PostMapping("/search")
    public String searchMovie(@RequestParam String title, Model model) {
        String url = "https://www.omdbapi.com/?apikey=" + API_KEY + "&t=" + title.replace(" ", "+");
        RestTemplate restTemplate = new RestTemplate();
        Movie movie = restTemplate.getForObject(url, Movie.class);
        model.addAttribute("movie", movie);


        model.addAttribute("topMovies", getTopMovies());

        return "index";
    }

    private List<Movie> getTopMovies() {
    String[] topTitles = {
        "The Shawshank Redemption", "The Godfather", "The Dark Knight", "Inception",
        "Pulp Fiction", "Fight Club", "Forrest Gump", "The Matrix",
        "Interstellar", "Parasite", "Gladiator", "The Prestige",
        "Avengers: Endgame", "Whiplash", "The Lion King", "The Departed",
        "Joker", "The Green Mile", "Se7en", "The Social Network"
    };

    List<Movie> topMovies = new ArrayList<>();
    RestTemplate restTemplate = new RestTemplate();

    for (String title : topTitles) {
        String url = "https://www.omdbapi.com/?apikey=" + API_KEY + "&t=" + title.replace(" ", "+");
        Movie movie = restTemplate.getForObject(url, Movie.class);
        if (movie != null && movie.getTitle() != null) {
            topMovies.add(movie);
        }
    }

    return topMovies;
    }
}

