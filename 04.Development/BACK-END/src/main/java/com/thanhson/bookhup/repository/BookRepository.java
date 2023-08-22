package com.thanhson.bookhup.repository;

import com.thanhson.bookhup.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitle(String title);

    List<Book> findByAuthor(String author);
    List<Book> findBooksByGenres_GenreID(Long genreID);

}
