package com.thanhson.bookhup.controller;

import com.thanhson.bookhup.model.Progress;
import com.thanhson.bookhup.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProgressController {
    @Autowired
    private ProgressService progressService;

    @PostMapping("/create")
    public ResponseEntity<Progress> createProgress(@RequestBody Progress progress) {
        Progress createdProgress = progressService.saveProgress(progress);
        return ResponseEntity.ok(createdProgress);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Progress> getProgressById(@PathVariable long id) {
        Progress progress = progressService.getProgressById(id);
        return ResponseEntity.ok(progress);
    }
}