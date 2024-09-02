package com.github.h3nriquel1ma.nexbankapigateway.Configs;


import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Configuration;

// Gateway - Aplicação para direcionar as requisições à seus devidos serviços.
@Configuration
public class GatewayConfig {

    public RouteLocator routeLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // Rotas de Registro
                .route("register_session_route", p -> p
                        .path("/register-session")
                        .uri("lb://register-service/register/session"))
                .route("register_client_route", p -> p
                        .path("/register-client")
                        .uri("lb://register-service/register/client"))
                // Rotas de Autenticação
                .route("authentication_route", p -> p
                        .path("/authenticate-user")
                        .uri("http://localhost:8020/authentication"))
                .build();
    }
}
