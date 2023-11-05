package com.thanhson.bookhup.repository;


import com.thanhson.bookhup.model.Book;
import com.thanhson.bookhup.model.Progress;
import com.thanhson.bookhup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {


   List<Progress> findByUserProgress(User userProgress);
    Progress findByUserProgressAndBook(User userProgress, Book book);
}
