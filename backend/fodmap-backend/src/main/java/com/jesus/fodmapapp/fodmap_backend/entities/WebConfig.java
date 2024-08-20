package com.jesus.fodmapapp.fodmap_backend.entities;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.lang.NonNull; // Asegúrate de importar esta clase

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**") // Permite todas las rutas
                .allowedOrigins("http://localhost:5173",
                "https://www.tufodmap.com", 
                "https://fodmap-app.onrender.com/alimento",
                "https://fodmap-app.onrender.com",
                "https://fodmap-app.vercel.app", 
                "https://fodmap-app-ortizzxzs-projects.vercel.app", 
                "https://fodmap-app-git-main-ortizzxzs-projects.vercel.app"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addInterceptors(@NonNull InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptor() {
            @Override
            public void postHandle(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull Object handler,@SuppressWarnings("null") ModelAndView modelAndView) throws Exception {
                response.setCharacterEncoding("UTF-8");
            }
        });
    }
}