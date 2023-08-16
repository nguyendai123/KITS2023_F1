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
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID", nullable = false)
    private long userID;

    @Column(name = "UserName", length = 50, nullable = false)
    private String userName;

    @Column(name = "Email", length = 50, nullable = false)
    private String email;

    @Column(name = "Password", length = 50, nullable = false)
    private String password;

    @Column(name = "Avatar", length = 255, nullable = false)
    private String avatar;

    @Column(name = "Biography", nullable = false)
    private String biography;

    @Column(name = "FavoritteGenres", length = 255, nullable = false)
    private String favoriteGenres;

    @Column(name = "Role", length = 50, nullable = false)
    private String role;

    @OneToMany(mappedBy = "user")
    private Set<Progress> progresses;

    @OneToMany(mappedBy = "user")
    private Set<Follow> follows;

    @OneToMany(mappedBy = "users")
    private Set<Follow> follow;

    @OneToMany(mappedBy = "userr")
    private Set<Review> reviews;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "users_roles",
        joinColumns = @JoinColumn(name = "UserID", referencedColumnName = "userID"),
            inverseJoinColumns = @JoinColumn(name = "RoleID", referencedColumnName = "roleID" )
    )
    private Set<Role> roles;
}

