package com.ktxdev.bugtracker.config;

import org.springframework.context.annotation.Configuration;

@Configuration
//@EnableSwagger2
//@Profile(value = {"dev", "test"})
public class SwaggerConfig {

//    @Bean
//    public Docket api() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.ktxdev"))
//                .paths(PathSelectors.any())
//                .build()
//                .apiInfo(getApiInformation());
//    }
//
//    private ApiInfo getApiInformation() {
//        return new ApiInfo("Bug tracker", "Bug tracker",
//                "1.0.0",
//                "API Terms of Service URL",
//                new Contact("ktxdev", "https://ktxdev.com", "sean@ktxdev.com"),
//                "API License",
//                "API License URL",
//                Collections.emptyList()
//        );
//    }
}