package com.jesus.fodmapapp.fodmap_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FodmapBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FodmapBackendApplication.class, args);
	}

}
