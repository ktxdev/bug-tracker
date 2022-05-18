package com.ktxdev.bugtracker.integration;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Commit;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Commit
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserIntegrationTests {
    @Value("${server.port}")
    private static int PORT;

    private static String baseUrl;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    public static void setUp() {
        baseUrl = String.format("http://localhost:%d/api/",  PORT);
    }

    @Test
    @Order(1)
    @WithMockUser(roles = "ADMIN")
    public void whenCreateUser_thenReturnCreated() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"email\":\"sean@gmail.com\", " +
                "\"password\":\"Password\", " +
                "\"confirmPassword\":\"Password\", " +
                "\"role\":\"ADMIN\"" +
                "}";

        mockMvc.perform(
                post(String.format("%s/v1/users", baseUrl))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isCreated());
    }

    @Test
    @Order(2)
    @WithMockUser(roles = "ADMIN")
    public void whenCreateUserWithoutRole_thenReturnBadRequest() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"email\":\"sean@gmail.com\", " +
                "\"password\":\"Password\", " +
                "\"confirmPassword\":\"Password\" " +
                "}";

        mockMvc.perform(
                post(String.format("%s/v1/users", baseUrl))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isBadRequest());
    }

    @Test
    @Order(3)
    public void whenRegister_thenReturnCreated() throws Exception {
        String json = "{" +
                "\"firstName\":\"Tinashe\", " +
                "\"lastName\":\"Chisenga\", " +
                "\"email\":\"tinashe@gmail.com\", " +
                "\"password\":\"Password\", " +
                "\"confirmPassword\":\"Password\" " +
                "}";


        mockMvc.perform(
                post(String.format("%s/opn/v1/users/sign-up", baseUrl))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isCreated());

        json = "{" +
                "\"firstName\":\"Prince\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"email\":\"prince@gmail.com\", " +
                "\"password\":\"Pass123\", " +
                "\"confirmPassword\":\"Pass123\" " +
                "}";

        mockMvc.perform(
                post(String.format("%s/opn/v1/users/sign-up", baseUrl))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isCreated());
    }

    @Test
    @Order(4)
    public void whenRegisterWithExistingEmail_thenReturnBadRequest() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"email\":\"sean@gmail.com\", " +
                "\"password\":\"Password\", " +
                "\"confirmPassword\":\"Password\" " +
                "}";

        mockMvc.perform(
                post(String.format("%s/opn/v1/users/sign-up", baseUrl))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isBadRequest());
    }

    @Test
    @Order(5)
    public void whenRegisterWithNonMatchingPassword_thenReturnBadRequest() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"email\":\"sean@gmail.com\", " +
                "\"password\":\"Pass123\", " +
                "\"confirmPassword\":\"Password\" " +
                "}";

        mockMvc.perform(
                post(String.format("%s/opn/v1/users/sign-up", baseUrl))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isBadRequest());
    }

    @Test
    @Order(6)
    @WithMockUser
    public void whenUpdate_thenShouldBeOk() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"password\":\"Password\", " +
                "\"confirmPassword\":\"Password\" " +
                "}";

        mockMvc.perform(
                put(String.format("%s/v1/users/1", baseUrl) )
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isOk());
    }

    @Test
    @Order(7)
    @WithMockUser
    public void whenUpdateWithNonMatchingPasswords_thenReturnBadRequest() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"password\":\"password\", " +
                "\"confirmPassword\":\"Password\", " +
                "}";

        mockMvc.perform(
                put(String.format("%s/v1/users/1", baseUrl))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isBadRequest());
    }

    @Test
    @Order(8)
    @WithMockUser(username = "sean@gmail.com")
    public void whenGetProfile_thenReturnOk() throws Exception {

        mockMvc.perform(
                get(String.format("%s/v1/users/profile", baseUrl))
        ).andExpect(status().isOk());
    }

    @Test
    @Order(9)
    @WithMockUser
    public void whenGetAllUsers_thenReturnOk() throws Exception {
        mockMvc.perform(
                get(String.format("%s/v1/users", baseUrl) )
        ).andExpect(status().isOk());
    }
}