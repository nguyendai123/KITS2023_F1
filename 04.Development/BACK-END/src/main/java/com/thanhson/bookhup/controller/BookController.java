package com.thanhson.bookhup.controller;

import com.thanhson.bookhup.model.Book;
import com.thanhson.bookhup.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{bookId}")
    public Optional<Book> getBookById(@PathVariable long bookId) {
        return bookService.getBookById(bookId);
    }

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<Book> saveBook(@ModelAttribute Book book, @RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        Book savedBook = bookService.saveBook(book, imageFile);
        return ResponseEntity.ok(savedBook);
    }

    @DeleteMapping("/{bookId}")
    public void deleteBook(@PathVariable long bookId) throws IOException {
        bookService.deleteBook(bookId);
    }
}
