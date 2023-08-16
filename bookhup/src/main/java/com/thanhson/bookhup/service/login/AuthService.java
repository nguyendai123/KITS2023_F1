package com.thanhson.bookhup.service.login;

import com.thanhson.bookhup.dto.LoginDto;

public interface AuthService {
    String login(LoginDto loginDto);
}
