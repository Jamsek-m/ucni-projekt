package com.mjamsek.servengapp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class NgController {

	@GetMapping("/**/{path:[^\\.]*}")
	public String posredujNaAngular(@PathVariable("path") String path) {
		return "forward:/index.html";
	}

}
