package mk.ukim.finki.sharespace.model.abstraction;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mk.ukim.finki.sharespace.model.enumeration.Role;
import mk.ukim.finki.sharespace.model.enumeration.Type;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Data
@Entity
@Table(name = "sharespace_user")
@EqualsAndHashCode(callSuper = true)
public abstract class User extends BaseEntity implements UserDetails {

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String fullName;
    private String city;
    private String municipality;
    private String phoneNumber;
    private String email;
    private String facebookLink;
    private String twitterLink;
    private String instagramLink;
    private String bio;

    private int rating;
    private int createdOffers;
    private int successfulDeals;
    private int moneySaved;

    private boolean isAccountNonExpired = true;
    private boolean isAccountNonLocked = true;
    private boolean isCredentialsNonExpired = true;
    private boolean isEnabled = true;

    public User() {}

    public User(Role role, Type type, String username, String password, String firstName, String lastName, String city, String municipality,
                String phoneNumber, String email, String facebookLink, String twitterLink, String instagramLink, String bio) {
        this.role = role;
        this.type = type;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
        this.city = city;
        this.municipality = municipality;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.facebookLink = facebookLink;
        this.twitterLink = twitterLink;
        this.instagramLink = instagramLink;
        this.bio = bio;

        this.rating = 0;
        this.createdOffers = 0;
        this.successfulDeals = 0;
        this.moneySaved = 0;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(this.role);
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }

}
