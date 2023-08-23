package com.thanhson.bookhup.service;

import com.thanhson.bookhup.exception.ResourceNotFoundException;
import com.thanhson.bookhup.model.Progress;
import com.thanhson.bookhup.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {


    @Autowired
    private ProgressRepository progressRepository;

//    public Progress saveProgress(Progress progress) {
//        return progressRepository.save(progress);
//    }
//
//    public Progress getProgressById(long id) {
//        return progressRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Progress not found"));
//    }
}
