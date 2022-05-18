package com.ktxdev.bugtracker.integration;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProjectIntegrationTests {
    @Value("${server.port}")
    private static int PORT;

    private static String baseUrl;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    public static void setUp() {
        baseUrl = String.format("http://localhost:%d/api/v1/projects",  PORT);
    }

    @Test
    @Order(1)
    @WithMockUser(roles = "ADMIN")
    @DisplayName("When create project should create")
    public void whenCreateProject_thenShouldCreate() throws Exception {
        String json = "{\"name\":\"Project 1\", \"description\":\"Test project description\"}";

        mockMvc.perform(
                post(baseUrl)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isCreated());
    }

    @Test
    @Order(2)
    @WithMockUser(roles = "USER")
    @DisplayName("When create project should create")
    public void whenCreateProject_thenShouldBeForbidden() throws Exception {
        String json = "{\"name\":\"Project 1\", \"description\":\"Test project description\"}";

        mockMvc.perform(
                post(baseUrl)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isForbidden());
    }

    @Test
    @Order(3)
    @WithMockUser(roles = "ADMIN")
    @DisplayName("When create project with existing name should return bad request")
    public void whenCreateProjectWithExistingName_thenShouldReturnBadRequest() throws Exception {
        String json = "{\"name\":\"Project 1\", \"description\":\"Test project description\"}";

        mockMvc.perform(
                post(baseUrl)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isBadRequest());
    }

    @Test
    @Order(4)
    @WithMockUser(roles = "ADMIN")
    @DisplayName("When update project then should return update")
    public void whenUpdateProject_thenShouldReturnOk() throws Exception {
        String json = "{\"name\":\"Project Test\", \"description\":\"Test project description\"}";

        mockMvc.perform(
                put(String.format("%s/%d", baseUrl, 1))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isOk());
    }
}
