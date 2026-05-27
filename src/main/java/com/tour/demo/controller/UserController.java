package com.tour.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.tour.demo.dtobject.LoginRequestDTO;
import com.tour.demo.dtobject.UserRegisterRequestDTO;
import com.tour.demo.dtobject.UserResponseDTO;
import com.tour.demo.model.User;
import com.tour.demo.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @Value("${app.register.secret}")
    private String registerSecret;

    @PostMapping("/register")
    public UserResponseDTO registerUser(@Valid @RequestBody UserRegisterRequestDTO req,@RequestHeader("X-REGISTER-SECRET") String secret){

        if(!secret.equals(registerSecret)){
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "Invalid secret"
            );
        }

        return userService.registerUser(req);
    }

    @GetMapping("/me")
    public UserResponseDTO me(
            Authentication authentication
    ) {

        User user =
                (User) authentication.getPrincipal();

        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }

   

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
    

}
