package mk.ukim.finki.sharespace.model.dto;

import lombok.Data;
import mk.ukim.finki.sharespace.model.enumeration.Type;

@Data
public class UserDto {

    private String firstName;
    private String lastName;
    private String city;
    private String municipality;
    private String phoneNumber;
    private String bio;
    private String facebookLink;
    private String twitterLink;
    private String instagramLink;
    private Type type;
    private String vehicleModel;

}
