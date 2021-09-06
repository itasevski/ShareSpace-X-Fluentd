package mk.ukim.finki.sharespace.service.implementation;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Driver;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.PasswordChangeDto;
import mk.ukim.finki.sharespace.model.dto.UserDto;
import mk.ukim.finki.sharespace.model.enumeration.Type;
import mk.ukim.finki.sharespace.model.exception.PasswordsDoNotMatchException;
import mk.ukim.finki.sharespace.model.exception.UserNotFoundException;
import mk.ukim.finki.sharespace.repository.UserRepository;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(s)
                .orElseThrow(() -> new UserNotFoundException("User with username " + s + " doesn't exist."));
    }

    @Override
    public User findById(String id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " doesn't exist."));
    }

    @Override
    public User findByUsername(String username) {
        return this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " doesn't exist."));
    }

    @Override
    public List<User> findByCityAndMunicipality(String city, String municipality) {
        return this.userRepository.findByCityAndMunicipality(city, municipality);
    }

    @Override
    public Optional<User> update(String id, UserDto userDto) {
        User user = findById(id);

        if (userDto.getType() == Type.DRIVER) {
            ((Driver) user).setVehicleModel(userDto.getVehicleModel());
        }
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setCity(userDto.getCity());
        user.setMunicipality(userDto.getMunicipality());
        user.setBio(userDto.getBio());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setFacebookLink(userDto.getFacebookLink());
        user.setTwitterLink(userDto.getTwitterLink());
        user.setInstagramLink(userDto.getInstagramLink());

        return Optional.of(this.userRepository.save(user));
    }

    @Override
    public Optional<User> changePassword(String id, PasswordChangeDto passwordChangeDto) {
        User user = findById(id);

        if(!this.passwordEncoder.matches(passwordChangeDto.getOldPassword(), user.getPassword())) {
            throw new PasswordsDoNotMatchException("Incorrect old password");
        }
        if(!passwordChangeDto.getNewPassword().equals(passwordChangeDto.getConfirmNewPassword())) {
            throw new PasswordsDoNotMatchException("Passwords do not match");
        }

        user.setPassword(this.passwordEncoder.encode(passwordChangeDto.getNewPassword()));

        return Optional.of(this.userRepository.save(user));
    }

}
