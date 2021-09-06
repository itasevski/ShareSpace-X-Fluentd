package mk.ukim.finki.sharespace.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FilterDto {

    @JsonProperty
    private boolean myLocation;
    private String city;
    private String municipality;

    @JsonProperty
    private boolean myOffers;
    private String userId;

    @JsonProperty
    private boolean passengerOffers;

    @JsonProperty
    private boolean driverOffers;

    @JsonProperty
    private boolean createdToday;

    @JsonProperty
    private boolean createdYesterday;

    @JsonProperty
    private boolean personLimitOneFive;

    @JsonProperty
    private boolean personLimitSixTen;

}
