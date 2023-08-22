package com.thanhson.bookhup.controller;


import com.thanhson.bookhup.model.Post;
import com.thanhson.bookhup.model.User;
import com.thanhson.bookhup.repository.GenreRepository;
import com.thanhson.bookhup.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class PostController {
    @Autowired
    private PostRepository postRepository;
    @GetMapping("/{postId}/liked-users")
    public ResponseEntity<List<String>> getLikedUserNames(@PathVariable Long postID) {
        Optional<Post> optionalPost = postRepository.findById(postID);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            List<User> likedUsers = post.getLikedUsers();
            List<String> likedUserNames = likedUsers.stream()
                    .map(User::getUsername)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(likedUserNames);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<String> likePost(@PathVariable Long postId) {
        // Tìm bài viết
        Optional<Post> optionalPost = postRepository.findById(postId);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();

            // Tăng giá trị likeCount
            int currentLikeCount = post.getLikeCount();
            post.setLikeCount(currentLikeCount + 1);
            postRepository.save(post);

            return ResponseEntity.ok("Post liked successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
