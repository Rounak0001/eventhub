package com.EventZen.auth.controller;

import com.EventZen.auth.dto.AdminLoginRequest;
import com.EventZen.auth.dto.AuthResponse;
import com.EventZen.auth.dto.LoginRequest;
import com.EventZen.auth.dto.MeResponse;
import com.EventZen.auth.dto.RegisterRequest;
import com.EventZen.auth.service.AuthService;
import com.EventZen.auth.service.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/admin/login")
    public AuthResponse adminLogin(@Valid @RequestBody AdminLoginRequest request) {
        return authService.adminLogin(request);
    }

    @GetMapping("/me")
    public MeResponse me(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing token");
        }

        String token = authHeader.substring(7);

        try {
            Claims claims = jwtService.parseToken(token);

            Long userId = Long.parseLong(String.valueOf(claims.get("userId")));
            return authService.me(userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
    }
}
