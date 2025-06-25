package com.springboot.webapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.util.function.Function;

@Configuration
public class SpringSecurityConfiguration {

    @Bean
    public InMemoryUserDetailsManager createUserDetailsManager() {
        UserDetails user1 = createUser("lbj", "1234");
        UserDetails user2 = createUser("jape", "2345");
        return new InMemoryUserDetailsManager(user1, user2);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public UserDetails createUser(String username, String password) {
        Function<String, String> encode = input -> passwordEncoder().encode(input);

        return User.builder()
                .passwordEncoder(encode)
                .username(username)
                .password(password)
                .roles("USER", "ADMIN")
                .build();
    }

    // we have to redefine everything since we are overriding this method
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF
                .headers(headers -> headers
                        .frameOptions(frame -> frame.disable()) // NEW: Correct way to disable frame options
                )
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated()
                )
                .formLogin(Customizer.withDefaults()); // Use default login form

        return http.build();
    }
}
