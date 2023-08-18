package com.thanhson.bookhup.controller;

import com.thanhson.bookhup.model.Genre;
import com.thanhson.bookhup.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class GenreController {
    @Autowired
    private GenreService genreService;

    @GetMapping
    public ResponseEntity<List<Genre>> getAllGenres() {
        List<Genre> genres = genreService.getAllGenres();
        return ResponseEntity.ok(genres);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Genre> getGenreById(@PathVariable("id") Long id) {
        Optional<Genre> genre = genreService.getGenreById(id);
        return genre.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(value="/findByName")
    public ResponseEntity<List<Genre>> getBooksByTitle(@RequestParam("name") String name) {
        List<Genre> genres = genreService.findByName(name);
        if (genres.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(genres);
        }
    }
    @PostMapping
    public ResponseEntity<Genre> createGenre(@RequestBody Genre genre) {
        Genre createdGenre = genreService.createGenre(genre);
        return ResponseEntity.ok(createdGenre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Genre> updateGenre(@PathVariable("id") Long id, @RequestBody Genre updatedGenre) {
        Optional<Genre> existingGenre = genreService.getGenreById(id);
        if (existingGenre.isPresent()) {
            Genre savedGenre = genreService.updateGenre(existingGenre.get(), updatedGenre);
            return ResponseEntity.ok(savedGenre);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGenreById(@PathVariable("id") Long id) {
        Optional<Genre> genre = genreService.getGenreById(id);
        if (genre.isPresent()) {
            genreService.deleteGenreById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
