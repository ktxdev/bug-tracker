package com.ktxdev.bugtracker.integration;

import lombok.val;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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
    public void whenCreateProject_thenShouldCreate() throws Exception {
        String json = "{\"name\":\"Project 1\", \"description\":\"Test project description\"}";

        mockMvc.perform(
                post(baseUrl)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isCreated());

        json = "{\"name\":\"Project 2\", \"description\":\"Test project description\"}";

        mockMvc.perform(
                post(baseUrl)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isCreated());
    }

    @Test
    @Order(2)
    @WithMockUser(roles = "USER")
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
    public void whenUpdateProject_thenShouldReturnOk() throws Exception {
        String json = "{\"name\":\"Project Test\", \"description\":\"Test project description\"}";

        mockMvc.perform(
                put(String.format("%s/%d", baseUrl, 1))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(5)
    @WithMockUser(roles = "ADMIN")
    public void whenUpdateProjectWithExistingName_thenShouldReturnBadRequest() throws Exception {
        String json = "{\"name\":\"Project Test\", \"description\":\"Test project description\"}";

        mockMvc.perform(
                put(String.format("%s/%d", baseUrl, 2))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isBadRequest());
    }

    @Test
    @Order(6)
    @WithMockUser
    public void whenGetProject_thenShouldBeOk() throws Exception {
        String expectedResponse = "{\"id\":2,\"name\":\"Project 2\",\"description\":\"Test project description\",\"members\":[]}";

        val mvcResult = mockMvc.perform(
                get(String.format("%s/%d", baseUrl, 2))
        ).andExpect(status().isOk())
                .andReturn();

        String actualResponse = mvcResult.getResponse().getContentAsString();
        assertThat(expectedResponse).isEqualTo(actualResponse);
    }

    @Test
    @Order(7)
    @WithMockUser
    public void whenGetAllProjects_thenShouldBeOk() throws Exception {
        mockMvc.perform(get(baseUrl))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andReturn();
    }

    @Test
    @Order(8)
    @WithMockUser(roles = "ADMIN")
    public void whenAddMember_thenShouldBeOk() throws Exception {
        mockMvc.perform(put(String.format("%s/%d/members/add-member?memberId=%d", baseUrl, 1, 1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members", hasSize(1)));

        mockMvc.perform(put(String.format("%s/%d/members/add-member?memberId=%d", baseUrl, 1, 2)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members", hasSize(2)));

        mockMvc.perform(put(String.format("%s/%d/members/add-member?memberId=%d", baseUrl, 1, 3)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members", hasSize(3)));

    }

    @Test
    @Order(9)
    @WithMockUser(roles = "ADMIN")
    public void whenAddAlreadyAddedMember_thenShouldBeBadRequest() throws Exception {
        mockMvc.perform(put(String.format("%s/%d/members/add-member?memberId=%d", baseUrl, 1, 2)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Order(10)
    @WithMockUser(roles = "ADMIN")
    public void whenRemoveMember_thenShouldBeOk() throws Exception {
        mockMvc.perform(put(String.format("%s/%d/members/remove-member?memberId=%d", baseUrl, 1, 2)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members", hasSize(2)));
    }

    @Test
    @Order(11)
    @WithMockUser(roles = "ADMIN")
    public void whenDeleteProject_thenShouldBeNoContent() throws Exception {
        mockMvc.perform(delete(String.format("%s/%d", baseUrl, 2)))
                .andExpect(status().isNoContent());
    }
}
