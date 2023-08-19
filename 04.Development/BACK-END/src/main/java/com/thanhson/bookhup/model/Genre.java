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
@Table(name = "genres" )
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "GenreID ", nullable = false)
    private long genreID;

    @Column(name = "GenreName", nullable = false, length = 50)
    private String genreName;

    @ManyToMany(mappedBy = "genres", fetch = FetchType.LAZY)
    private Set<Book> books = new HashSet<>();
}
