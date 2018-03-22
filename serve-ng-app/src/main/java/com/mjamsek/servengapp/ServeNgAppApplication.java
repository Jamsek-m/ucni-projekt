package com.mjamsek.servengapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ServeNgAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServeNgAppApplication.class, args);
	}
	
}
