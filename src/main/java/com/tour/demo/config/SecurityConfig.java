package com.tour.demo.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){

        CorsConfiguration configuration= new CorsConfiguration();

        configuration.setAllowedOrigins(
            List.of("https://sunturist-hd9cbbkh8-bsunturists-projects.vercel.app/")
            );

            configuration.setAllowedMethods(
                    List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
            );

            configuration.setAllowedHeaders(
                    List.of("*")
            );

            configuration.setAllowCredentials(true);

            UrlBasedCorsConfigurationSource source =
                    new UrlBasedCorsConfigurationSource();

            source.registerCorsConfiguration(
                    "/**",
                    configuration
            );

            return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config){
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        
        http.csrf(csrf->csrf.disable())
            .cors(cors->{})
            .authorizeHttpRequests(auth->auth
                .requestMatchers(
                    "/api/users/register",
                    "/api/users/login").permitAll()
                    .anyRequest().authenticated()
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(
                    new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                )
            )
            .formLogin(form->form
                .loginProcessingUrl("/api/users/login")
                .successHandler((request,response,authentication)->{
                    response.setStatus(200);
                })
                .failureHandler((request,response,exception)->{
                    response.setStatus(401);
                })

            ).logout(logout -> logout

            .logoutUrl(
                "/api/users/logout"
            )

            .logoutSuccessHandler(
                (
                    request,
                    response,
                    authentication
                ) -> {

                    response.setStatus(200);
                }
            )

            .invalidateHttpSession(true)

            .deleteCookies(
                "JSESSIONID"
            )
            );

        return http.build();
    }


}
