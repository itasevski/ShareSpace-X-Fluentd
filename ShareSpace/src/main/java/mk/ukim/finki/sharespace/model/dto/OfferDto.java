package mk.ukim.finki.sharespace.model.dto;

import lombok.Data;
import mk.ukim.finki.sharespace.model.enumeration.OfferType;
import mk.ukim.finki.sharespace.model.enumeration.TransportVehicle;

import java.util.Set;

@Data
public class OfferDto {

    private OfferType type;
    private TransportVehicle transportationVehicle;
    private String startDate;
    private String city;
    private String municipality;
    private int personLimit;
    private String userId;
    private String destination;
    private Set<String> rendezvousPoints;

}
