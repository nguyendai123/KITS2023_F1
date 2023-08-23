package com.thanhson.bookhup.controller;

import com.thanhson.bookhup.model.Follow;
import com.thanhson.bookhup.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/follows")
public class FollowController {
    private FollowService followService;
    @Autowired
    public FollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping
    public Follow createFollow(@RequestBody Follow follow) {
        return followService.createFollow(follow);
    }

    @DeleteMapping("/{followID}")
    public void deleteFollow(@PathVariable long followID) {
        followService.deleteFollow(followID);
    }
}
