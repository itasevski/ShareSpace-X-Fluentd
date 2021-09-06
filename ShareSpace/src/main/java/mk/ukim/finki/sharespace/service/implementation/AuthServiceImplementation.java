package mk.ukim.finki.sharespace.service.implementation;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Driver;
import mk.ukim.finki.sharespace.model.Passenger;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.auth.RegistrationDto;
import mk.ukim.finki.sharespace.model.enumeration.Role;
import mk.ukim.finki.sharespace.model.enumeration.Type;
import mk.ukim.finki.sharespace.model.exception.EmailExistsException;
import mk.ukim.finki.sharespace.model.exception.PasswordsDoNotMatchException;
import mk.ukim.finki.sharespace.model.exception.UsernameExistsException;
import mk.ukim.finki.sharespace.repository.UserRepository;
import mk.ukim.finki.sharespace.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthServiceImplementation implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> register(RegistrationDto registrationDto) {
        if(!registrationDto.getPassword().equals(registrationDto.getConfirmPassword())) {
            throw new PasswordsDoNotMatchException("Passwords do not match.");
        }
        if(this.userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new EmailExistsException("The email " + registrationDto.getEmail() + " is already associated with an account.");
        }
        if(this.userRepository.existsByUsername(registrationDto.getUsername())) {
            throw new UsernameExistsException("The username " + registrationDto.getUsername() + " is already taken.");
        }

        User user = null;

        if(registrationDto.getType() == Type.DRIVER) {
            user = new Driver(null, Role.ROLE_USER, Type.DRIVER, registrationDto.getUsername(), this.passwordEncoder.encode(registrationDto.getPassword()),
                    registrationDto.getFirstName(), registrationDto.getLastName(), registrationDto.getCity(), registrationDto.getMunicipality(), registrationDto.getPhoneNumber(), registrationDto.getEmail(), null,
                    null, null, null);
        }
        else {
            user = new Passenger(Role.ROLE_USER, Type.PASSENGER, registrationDto.getUsername(), this.passwordEncoder.encode(registrationDto.getPassword()),
                    registrationDto.getFirstName(), registrationDto.getLastName(), registrationDto.getCity(), registrationDto.getMunicipality(), registrationDto.getPhoneNumber(), registrationDto.getEmail(),
                    null, null, null, null);
        }

        return Optional.of(this.userRepository.save(user));
    }

}
