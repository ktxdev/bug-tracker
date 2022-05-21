package com.ktxdev.bugtracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@Configuration
@EnableSwagger2
//@Profile(value = {"dev", "test"})
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ktxdev"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(getApiInformation());
    }

    private ApiInfo getApiInformation() {
        return new ApiInfo("Bug tracker", "Bug tracker",
                "1.0.0",
                "API Terms of Service URL",
                new Contact("ktxdev", "https://ktxdev.com", "sean@ktxdev.com"),
                "API License",
                "API License URL",
                Collections.emptyList()
        );
    }
}