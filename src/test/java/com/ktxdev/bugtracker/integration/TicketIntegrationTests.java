package com.ktxdev.bugtracker.integration;

import com.ktxdev.bugtracker.exception.InvalidRequestException;
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
import static org.assertj.core.api.Assertions.shouldHaveThrown;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TicketIntegrationTests {
    @Value("${server.port}")
    private static int PORT;

    private static String baseUrl;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    public static void setUp() {
        baseUrl = String.format("http://localhost:%d/api/v1/tickets",  PORT);
    }

    @Test
    @Order(1)
    @WithMockUser
    public void whenCreateTicket_thenShouldCreate() throws Exception {
        String json = "{" +
                "\"title\": \"Ticket 1\", " +
                "\"description\": \"Ticket Description 1\"," +
                "\"type\":\"BUG\"," +
                "\"priority\":\"LOW\"," +
                "\"status\":\"OPEN\"," +
                "\"timeEstimated\": {\"timeEstimated\": 2, \"timeEstimatedUnit\": \"HOURS\"}," +
                "\"projectId\": 1}";

        mockMvc.perform(
                post(baseUrl)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.ticketNo", notNullValue()))
                .andExpect(jsonPath("$.assignees", hasSize(0)));

        json = "{" +
                "\"title\": \"Ticket 2\", " +
                "\"description\": \"Ticket Description 2\"," +
                "\"type\":\"ISSUE\"," +
                "\"priority\":\"HIGH\"," +
                "\"status\":\"OPEN\"," +
                "\"timeEstimated\": {\"timeEstimated\": 30, \"timeEstimatedUnit\": \"MINUTES\"}," +
                "\"projectId\": 1," +
                "\"assigneeIds\": [1]}";

        mockMvc.perform(
                        post(baseUrl)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.ticketNo", notNullValue()))
                .andExpect(jsonPath("$.assignees", hasSize(1)));
    }

    @Test
    @Order(3)
    @WithMockUser
    public void whenCreateTicketWithNonMemberAssignee_thenShouldReturnBadRequest() throws Exception {
        String json = "{" +
                "\"title\": \"Ticket 1\", " +
                "\"description\": \"Ticket Description 1\"," +
                "\"type\":\"BUG\"," +
                "\"priority\":\"LOW\"," +
                "\"status\":\"OPEN\"," +
                "\"timeEstimated\": {\"timeEstimated\": 2, \"timeEstimatedUnit\": \"HOURS\"}," +
                "\"projectId\": 1," +
                "\"assigneeIds\": [3]}";

        mockMvc.perform(
                        post(baseUrl)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Order(4)
    @WithMockUser
    public void whenUpdateTicket_thenShouldBeOk() throws Exception {
        String json = "{" +
                "\"title\": \"Updated Ticket 1\", " +
                "\"description\": \"Update Ticket Description 1\"," +
                "\"type\":\"BUG\"," +
                "\"priority\":\"LOW\"," +
                "\"status\":\"CLOSED\"," +
                "\"timeEstimated\": {\"timeEstimated\": 2, \"timeEstimatedUnit\": \"HOURS\"}," +
                "\"projectId\": 1," +
                "\"assigneeIds\": [1]}";

        mockMvc.perform(
                    put(baseUrl + "/" + 1)
                            .contentType(MediaType.APPLICATION_JSON_VALUE)
                            .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.assignees", hasSize(1)));
    }

    @Test
    @Order(5)
    @WithMockUser
    public void whenGetTicketById_thenShouldBeOk() throws Exception {
        mockMvc.perform(get(baseUrl + "/" + 2))
            .andExpect(status().isOk());
    }

    @Test
    @Order(6)
    @WithMockUser(username = "sean@gmail.com")
    public void whenGetAllTicketsWithAdminUser_thenShouldReturnAll() throws Exception {
        mockMvc.perform(
                get(baseUrl))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content", hasSize(2))).andReturn();
    }

    @Test
    @Order(7)
    @WithMockUser(username = "prince@gmail.com")
    public void whenGetAllTicketsWithUser_thenShouldReturnAllAssignedToUser() throws Exception {
        mockMvc.perform(
                        get(baseUrl))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(0)));
    }

    @Test
    @Order(8)
    @WithMockUser
    public void whenDelete_thenShouldBeNoContent() throws Exception {
        mockMvc.perform(
                        delete(String.format("%s/%d",baseUrl, 2)))
                .andExpect(status().isNoContent());
    }
}
