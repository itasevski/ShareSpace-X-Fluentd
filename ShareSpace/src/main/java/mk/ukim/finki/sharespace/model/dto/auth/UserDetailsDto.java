package mk.ukim.finki.sharespace.model.dto.auth;

import lombok.Data;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.enumeration.Role;

@Data
public class UserDetailsDto {

    private String username;
    private Role role;

    public static UserDetailsDto of(User user) {
        UserDetailsDto userDetailsDto = new UserDetailsDto();
        userDetailsDto.setUsername(user.getUsername());
        userDetailsDto.setRole(user.getRole());
        return userDetailsDto;
    }

}
