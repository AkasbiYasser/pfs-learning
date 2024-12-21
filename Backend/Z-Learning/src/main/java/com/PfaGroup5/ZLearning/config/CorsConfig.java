import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Autoriser les origines nécessaires
        config.setAllowedOriginPatterns(List.of(
            "http://rssplearning.tech",
            "https://rssplearning.tech",
            "http://*.rssplearning.tech",
            "https://*.rssplearning.tech",
            "http://localhost:3000",
            "http://frontend-service:3000",
            "http://backend-service:8080"
        ));

        // Autoriser toutes les méthodes HTTP
        config.addAllowedMethod("*");

        // Autoriser tous les headers
        config.addAllowedHeader("*");

        // Autoriser les credentials (cookies)
        config.setAllowCredentials(true);

        // Enregistrement de la configuration CORS pour toutes les requêtes
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}

