package com.tour.demo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/register")
    public UserResponseDTO registerUser(@Valid @RequestBody UserRegisterRequestDTO req){
        return userService.registerUser(req);
    }

    /*@PostMapping("/login")
    public UserResponseDTO login(@Valid @RequestBody LoginRequestDTO req){
        return userService.login(req);
    }*/

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

}
