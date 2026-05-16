package com.tour.demo.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tour.demo.dtobject.LoginRequestDTO;
import com.tour.demo.dtobject.UserRegisterRequestDTO;
import com.tour.demo.dtobject.UserResponseDTO;
import com.tour.demo.model.User;
import com.tour.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public UserResponseDTO registerUser(UserRegisterRequestDTO req){

        if(userRepository.existsByEmail(req.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        if(userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user=User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .build();
            
        User savedUser=userRepository.save(user);

        return UserResponseDTO.builder()
            .id(savedUser.getId())
            .username(savedUser.getUsername())
            .email(savedUser.getEmail())
            .build();

    }

    public UserResponseDTO login(LoginRequestDTO req){

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );

        User user=userRepository.findByUsername(req.getUsername())
            .orElseThrow(()-> new RuntimeException("Invalid username or password"));

        /*boolean passwordMatches=passwordEncoder.matches(req.getPassword(), user.getPassword());

        if(!passwordMatches){
            throw new RuntimeException("Invalid username or password");
        }*/

        return UserResponseDTO.builder()
            .id(user.getId())
            .username(user.getUsername())
            .email(user.getEmail())
            .build();
    }


    

}
