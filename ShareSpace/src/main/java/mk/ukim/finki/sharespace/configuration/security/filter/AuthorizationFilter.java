package mk.ukim.finki.sharespace.configuration.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import mk.ukim.finki.sharespace.configuration.security.constants.AuthenticationConstants;
import mk.ukim.finki.sharespace.model.dto.auth.UserDetailsDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class AuthorizationFilter extends BasicAuthenticationFilter {

    public AuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(AuthenticationConstants.HEADER_NAME);

        if(header == null || !header.startsWith(AuthenticationConstants.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken token = getToken(header);
        SecurityContextHolder.getContext().setAuthentication(token);

        chain.doFilter(request, response);
    }

    public UsernamePasswordAuthenticationToken getToken(String header) throws JsonProcessingException {
        String user = JWT
                .require(Algorithm.HMAC256(AuthenticationConstants.SECRET.getBytes()))
                .build()
                .verify(header.replace(AuthenticationConstants.TOKEN_PREFIX, ""))
                .getSubject();

        if(user == null) return null;

        UserDetailsDto userDetails = new ObjectMapper().readValue(user, UserDetailsDto.class);

        return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), "", Collections.singletonList(userDetails.getRole()));
    }

}
