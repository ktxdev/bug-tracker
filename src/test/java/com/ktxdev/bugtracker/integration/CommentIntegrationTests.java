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

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CommentIntegrationTests {
    @Value("${server.port}")
    private static int PORT;

    private static String baseUrl;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    public static void setUp() {
        baseUrl = String.format("http://localhost:%d/api/v1/comments",  PORT);
    }

    @Test
    @Order(1)
    @WithMockUser
    public void whenCreateComment_thenShouldCreate() throws Exception {
        String json = "{" +
                "\"text\": \"Ticket 1 Comment Test 1\"," +
                "\"ticketId\": 1," +
                "\"userId\": 3" +
                "}";

        mockMvc.perform(
                post(baseUrl)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json))
                .andExpect(status().isCreated());


        json = "{" +
                "\"text\": \"Ticket 1 Comment Test 2\"," +
                "\"ticketId\": 1," +
                "\"userId\": 1" +
                "}";;

        mockMvc.perform(
                        post(baseUrl)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(json))
                .andExpect(status().isCreated());
    }

    @Test
    @Order(2)
    @WithMockUser
    public void whenUpdateComment_thenShouldBeOk() throws Exception {
        String json = "{" +
                "\"text\": \"Ticket 1 Comment Test 1 Updated\"," +
                "\"ticketId\": 1," +
                "\"userId\": 3" +
                "}";

        mockMvc.perform(
                        put(baseUrl + "/" + 1)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(json))
                .andExpect(status().isOk());
    }

    @Test
    @Order(3)
    @WithMockUser
    public void whenGetCommentById_thenShouldBeOk() throws Exception {
        mockMvc.perform(
                        get(baseUrl + "/" + 2))
                .andExpect(status().isOk());
    }

    @Test
    @Order(4)
    @WithMockUser
    public void whenGetCommentsByTicketNo_thenShouldBeOk() throws Exception {
        mockMvc.perform(
                        get(baseUrl + "?ticketNo=000001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)));
    }

    @Test
    @Order(5)
    @WithMockUser
    public void whenDeleteComment_thenShouldBeNoContent() throws Exception {
        mockMvc.perform(
                        delete(baseUrl + "/" + 2))
                .andExpect(status().isNoContent());
    }
}
