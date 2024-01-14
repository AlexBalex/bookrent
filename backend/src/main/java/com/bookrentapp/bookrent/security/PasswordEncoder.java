// package com.bookrentapp.bookrent.security;



// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.crypto.password.PasswordEncoder;

// @Configuration
// @EnableWebSecurity
// public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @Override
//     protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//         // Configure authentication manager with your user details service
//         auth
//             .inMemoryAuthentication()
//             .withUser("user")
//             .password(passwordEncoder().encode("password"))
//             .roles("USER");
//     }

//     @Override
//     protected void configure(HttpSecurity http) throws Exception {
//         http
//             .authorizeRequests()
//                 .antMatchers("/public/**").permitAll()
//                 .anyRequest().authenticated()
//                 .and()
//             .formLogin()
//                 .loginPage("/login")
//                 .permitAll()
//                 .and()
//             .logout()
//                 .permitAll();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return passwordEncoder;
//     }
// }