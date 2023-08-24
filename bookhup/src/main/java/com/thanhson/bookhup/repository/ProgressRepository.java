package com.thanhson.bookhup.repository;

import com.thanhson.bookhup.model.Book;
import com.thanhson.bookhup.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
}
