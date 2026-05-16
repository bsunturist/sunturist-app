package com.tour.demo.dtobject;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDTO {
    private Long id;

    private String username;

    private String email;
}
