package com.thanhson.bookhup.controller;

import com.thanhson.bookhup.Upload.FileUploadUtil;
import com.thanhson.bookhup.model.Book;
import com.thanhson.bookhup.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/books/{bookId}")
    public Optional<Book> getBookById(@PathVariable long bookId) {
        return bookService.getBookById(bookId);
    }
    @GetMapping(value="/books/findByTitle")
    public ResponseEntity<List<Book>> getBooksByTitle(@RequestParam("title") String title) {
        List<Book> books = bookService.findByTitle(title);
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(books);
        }
    }
    @GetMapping("/books/findByAuthor")
    public ResponseEntity<List<Book>> findByAuthor(@RequestParam("author") String author) {
        List<Book> books = bookService.findByAuthor(author);
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(books);
        }
    }
    @PostMapping(value = "/books/add", consumes = "multipart/form-data")
    public ResponseEntity<Book> saveBook(@ModelAttribute Book book, @RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        Book savedBook = bookService.saveBook(book, imageFile);
        return ResponseEntity.ok(savedBook);
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") Long id, @ModelAttribute Book updatedBook, @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) {
        Optional<Book> existingBookOptional = bookService.getBookById(id);

        if (existingBookOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Book existingBook = existingBookOptional.get();
        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setIsbn(updatedBook.getIsbn());
        existingBook.setPage(updatedBook.getPage());
        existingBook.setAverageRating(updatedBook.getAverageRating());
        existingBook.setSummary(updatedBook.getSummary());

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String fileName = StringUtils.cleanPath(imageFile.getOriginalFilename());
                existingBook.setImage(fileName);

                String uploadDir = "image/" + existingBook.getBookID();
                FileUploadUtil.saveFile(uploadDir, fileName, imageFile);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        try {
            Book updatedBookResult = bookService.saveBook(existingBook, imageFile);
            return ResponseEntity.ok(updatedBookResult);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/books/{bookId}")
    public void deleteBook(@PathVariable long bookId) throws IOException {
        bookService.deleteBook(bookId);
    }

}