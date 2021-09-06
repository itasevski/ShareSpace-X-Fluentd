package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.PasswordChangeDto;
import mk.ukim.finki.sharespace.model.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {

    User findById(String id);

    User findByUsername(String username);

    List<User> findByCityAndMunicipality(String city, String municipality);

    Optional<User> update(String id, UserDto userDto);

    Optional<User> changePassword(String id, PasswordChangeDto passwordChangeDto);

}
