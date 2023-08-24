package com.thanhson.bookhup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name="ReviewID", nullable = false)
    private long reviewID;

    @Column(name="Comment", length = 255)
    private String comment;

    @Column(name="Rank")
    private int rank;

    @Column(name="LikeCount")
    private int likeCount;

    @ManyToOne
    @JoinColumn(name="UserID")
    private User userReview;

    @ManyToOne
    @JoinColumn(name="BookID")
    private Book bookReview;

}
