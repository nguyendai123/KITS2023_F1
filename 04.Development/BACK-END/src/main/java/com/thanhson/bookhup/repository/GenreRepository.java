package com.thanhson.bookhup.repository;

import com.thanhson.bookhup.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {

    List<Genre> findByName(String genreName);

    List<Genre> findGenresByBooksId(Long bookID);
}
