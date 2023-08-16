package com.thanhson.bookhup.repository;

import com.thanhson.bookhup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String username);
    Boolean existsByEmail(String email);
    Optional<User> findByUserNameOrEmail(String username, String email);

    boolean existsByUserName(String username);
}
