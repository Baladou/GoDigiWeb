package com.freindShip.freindShip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class FreindShipApplication {

	public static void main(String[] args) {
		SpringApplication.run(FreindShipApplication.class, args);
	}

}
