package mk.ukim.finki.sharespace.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.enumeration.Role;
import mk.ukim.finki.sharespace.model.enumeration.Type;

import javax.persistence.Entity;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Driver extends User {

    private String vehicleModel;

    public Driver() {}

    public Driver(String vehicleModel,
                  Role role, Type type, String username, String password, String firstName, String lastName, String city, String municipality,
                  String phoneNumber, String email, String facebookLink, String twitterLink, String instagramLink, String bio) {
        super(role, type, username, password, firstName, lastName, city, municipality, phoneNumber, email, facebookLink, twitterLink, instagramLink, bio);
        this.vehicleModel = vehicleModel;
    }

}
