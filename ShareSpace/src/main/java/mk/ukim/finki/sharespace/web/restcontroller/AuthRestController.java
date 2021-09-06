package mk.ukim.finki.sharespace.web.restcontroller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.auth.RegistrationDto;
import mk.ukim.finki.sharespace.service.AuthService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthRestController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegistrationDto registrationDto) {
        return this.authService.register(registrationDto)
                .map(user -> ResponseEntity.ok().body(user))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}
