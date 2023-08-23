package com.thanhson.bookhup.service;

import com.thanhson.bookhup.model.Follow;
import com.thanhson.bookhup.repository.FollowRepository;
import org.springframework.stereotype.Service;

@Service
public class FollowService {
    private FollowRepository followRepository;

    public Follow createFollow(Follow follow) {
        return followRepository.save(follow);
    }

    public void deleteFollow(long followID) {
        followRepository.deleteById(followID);
    }
}
