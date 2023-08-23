package com.thanhson.bookhup.service;
import com.thanhson.bookhup.model.Like;
import com.thanhson.bookhup.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    public List<Like> findAllByPostId(Long postID) {
        return likeRepository.findAllByPost_PostID(postID);
    }
}
