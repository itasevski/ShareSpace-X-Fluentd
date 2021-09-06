package mk.ukim.finki.sharespace.model.dto.auth;

import lombok.Data;
import mk.ukim.finki.sharespace.model.enumeration.Type;

@Data
public class RegistrationDto {

    private String firstName;
    private String lastName;
    private String city;
    private String municipality;
    private String email;
    private String phoneNumber;
    private String username;
    private String password;
    private String confirmPassword;
    private Type type;

}
