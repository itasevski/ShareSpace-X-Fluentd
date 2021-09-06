package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.auth.RegistrationDto;

import java.util.Optional;

public interface AuthService {

    Optional<User> register(RegistrationDto registrationDto);

}
