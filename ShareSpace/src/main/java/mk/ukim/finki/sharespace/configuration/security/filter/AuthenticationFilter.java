package mk.ukim.finki.sharespace.configuration.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.configuration.security.constants.AuthenticationConstants;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.auth.LoginDto;
import mk.ukim.finki.sharespace.model.dto.auth.UserDetailsDto;
import mk.ukim.finki.sharespace.model.exception.PasswordsDoNotMatchException;
import mk.ukim.finki.sharespace.model.exception.UserNotFoundException;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@AllArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        LoginDto userInfo = null;

        try {
            userInfo = new ObjectMapper().readValue(request.getInputStream(), LoginDto.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        if(userInfo == null) throw new UserNotFoundException("Error: Attempted authentication failed.");

        UserDetails userDetails = this.userService.loadUserByUsername(userInfo.getUsername());

        if(!this.passwordEncoder.matches(userInfo.getPassword(), userDetails.getPassword())) {
            throw new PasswordsDoNotMatchException("Error: Passwords do not match.");
        }

        return this.authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userInfo.getPassword(), userDetails.getAuthorities()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = (User) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject(new ObjectMapper().writeValueAsString(UserDetailsDto.of(user)))
                .withExpiresAt(new Date(System.currentTimeMillis() + AuthenticationConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(AuthenticationConstants.SECRET.getBytes()));

        response.addHeader(AuthenticationConstants.HEADER_NAME, AuthenticationConstants.TOKEN_PREFIX + jwtToken);
        response.getWriter().append(jwtToken);
    }
}
