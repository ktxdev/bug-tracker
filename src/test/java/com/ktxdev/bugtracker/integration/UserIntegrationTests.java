package com.ktxdev.bugtracker.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class UserIntegrationTests {
    @Value("${server.port}")
    private int PORT;
    @Autowired
    private MockMvc mockMvc;

    @Test
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
                post("http://localhost:" + PORT + "/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isCreated());
    }

    @Test
    public void whenCreateUserWithoutRole_thenReturnBadRequest() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"email\":\"sean@gmail.com\", " +
                "\"password\":\"Password\", " +
                "\"confirmPassword\":\"Password\", " +
                "}";

        mockMvc.perform(
                post("api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isBadRequest());
    }

    @Test
    public void whenRegister_thenReturnCreated() throws Exception {
        String json = "{" +
                "\"firstName\":\"Tinashe\", " +
                "\"lastName\":\"Chisenga\", " +
                "\"email\":\"tinashe@gmail.com\", " +
                "\"password\":\"Pass123\", " +
                "\"confirmPassword\":\"Password\", " +
                "}";

        mockMvc.perform(
                post("http://localhost:" + PORT + "/api/opn/v1/users/sign-up")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isCreated());
    }

    @Test
    public void whenRegisterWithExistingEmail_thenReturnBadRequest() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"email\":\"sean@gmail.com\", " +
                "\"password\":\"Password\", " +
                "\"confirmPassword\":\"Password\", " +
                "}";

        mockMvc.perform(
                post("api/opn/v1/users/sign-up")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isBadRequest());
    }

    @Test
    public void whenRegisterWithNonMatchingPassword_thenReturnBadRequest() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"email\":\"sean@gmail.com\", " +
                "\"password\":\"Pass123\", " +
                "\"confirmPassword\":\"Password\", " +
                "}";

        mockMvc.perform(
                post("api/opn/v1/users/sign-up")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isBadRequest());
    }

    @Test
    public void whenUpdate_thenShouldBeOk() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"password\":\"Password\", " +
                "\"confirmPassword\":\"Password\", " +
                "}";

        mockMvc.perform(
                put("api/v1/users/1" )
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isOk());
    }

    @Test
    public void whenUpdateWithNonMatchingPasswords_thenReturnBadRequest() throws Exception {
        String json = "{" +
                "\"firstName\":\"Sean\", " +
                "\"lastName\":\"Huvaya\", " +
                "\"password\":\"password\", " +
                "\"confirmPassword\":\"Password\", " +
                "}";

        mockMvc.perform(
                put("api/v1/users/1" )
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(json)
        ).andExpect(status().isBadRequest());
    }

    @Test
    public void whenGetProfile_thenReturnOk() throws Exception {
//        String res = "{" +
//                "\"id\": 1" +
//                "\"firstName\":\"Sean\", " +
//                "\"lastName\":\"Huvaya\", " +
//                "\"email\":\"sean@gmail.com\", " +
//                "\"password\":\"Password\", " +
//                "\"confirmPassword\":\"Password\", " +
//                "\"role\":\"ADMIN\"" +
//                "}";

        mockMvc.perform(
                get("api/v1/users/profile" )
        ).andExpect(status().isOk());
    }

    @Test
    public void whenGetAllUsers_thenReturnOk() throws Exception {
        mockMvc.perform(
                get("api/v1/users" )
        ).andExpect(status().isOk());
    }
}