package com.github.h3nriquel1ma.nexbankapigateway.Configs;


import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    public RouteLocator routeLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("register_route", p -> p
                        .path("/register-user")
                        .uri(""))
                .route("authentication_route", p -> p
                        .path("/authenticate-user")
                        .uri(""))
                .build();
    }
}
