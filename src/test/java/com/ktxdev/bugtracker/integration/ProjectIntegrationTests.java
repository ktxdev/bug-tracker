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

@Order(2)
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProjectIntegrationTests {
    @Value("${server.port}")
    private int PORT;
    @Autowired
    private MockMvc mockMvc;

    private String baseUrl;

    @BeforeEach
    public void setUp() {
        baseUrl = String.format("http://localhost:%d/api/v1/projects",  PORT);
    }

    @Test
    @Order(1)
    @WithMockUser
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
    @WithMockUser
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
    @Order(3)
    @WithMockUser
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
