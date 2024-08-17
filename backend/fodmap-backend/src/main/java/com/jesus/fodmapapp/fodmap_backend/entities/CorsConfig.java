package com.jesus.fodmapapp.fodmap_backend.entities;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;


@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("https://www.tufodmap.com/", "https://fodmap-app.vercel.app/", "https://fodmap-app-ortizzxzs-projects.vercel.app/", "https://fodmap-app-git-main-ortizzxzs-projects.vercel.app/")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}