package com.thanhson.bookhup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "books")

public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "BookID", nullable = false)
    private long bookID;

    @Column(name= "Title", length = 255, nullable = false)
    private String title;

    @Column(name="Image")

    private String image;

    @Column(name = "Author", length = 50, nullable = false)
    private String author;

    @Column(name="ISBN", length = 50, nullable = false)
    private String isbn;

    @Column(name="Page", length = 50, nullable = false)
    private int page;

    @Column(name = "Summary", nullable = false)
    private String summary;

    @Column(name="AverageRating", nullable = false)
    private double averageRating;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "book_genre",
            joinColumns = @JoinColumn(name = "BookID"),
            inverseJoinColumns = @JoinColumn(name = "GenreID")
    )
    private Set<Genre> genres = new HashSet<>();

    @OneToMany(mappedBy = "book")
    Set<Progress> progresses;

    @OneToMany(mappedBy = "bookk")
    private Set<Review> review;
}
