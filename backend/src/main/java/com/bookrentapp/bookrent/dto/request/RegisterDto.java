package com.bookrentapp.bookrent.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RegisterDto {
    private String email;
    private String password;

}