package com.ktxdev.bugtracker.integration;

import lombok.val;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DashboardIntegrationTests {
    @Value("${server.port}")
    private static int PORT;

    private static String baseUrl;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    public static void setUp() {
        baseUrl = String.format("http://localhost:%d/api/v1/dashboard",  PORT);
    }

    @Test
    @Order(1)
    @WithMockUser(username = "admin@ktxdev.com")
    public void whenGetStatsWithAdminRole_thenShouldReturnStatsForWholeSystem() throws Exception {
        mockMvc.perform(get(baseUrl))
                .andExpect(status().isOk());
    }

    @Test
    @Order(2)
    @WithMockUser(username = "user@ktxdev.com")
    public void whenGetStatsWithUserRole_thenShouldReturnStatsForThatUserOnly() throws Exception {
        mockMvc.perform(get(baseUrl))
                .andExpect(status().isOk());
    }
}
