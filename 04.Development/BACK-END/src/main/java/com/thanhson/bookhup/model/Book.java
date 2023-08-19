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

    @Column(name = "BookID")
    private long bookID;

    @Column(name= "Title", length = 255)
    private String title;

    @Column(name="Image")
    private String image;

    @Column(name = "Author", length = 50)
    private String author;

    @Column(name="ISBN", length = 50)
    private String isbn;

    @Column(name = "Summary")
    private String summary;

    @Column(name="AverageRating")
    private double averageRating;

    @Column(name="Page")
    private int page;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "book_genre",
            joinColumns = @JoinColumn(name = "BookID"),
            inverseJoinColumns = @JoinColumn(name = "GenreID")
    )
    private Set<Genre> genres = new HashSet<>();

    @OneToMany(mappedBy = "book")
    Set<Progress> progresses;


}
