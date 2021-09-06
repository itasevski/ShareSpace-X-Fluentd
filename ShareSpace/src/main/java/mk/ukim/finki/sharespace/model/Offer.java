package mk.ukim.finki.sharespace.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mk.ukim.finki.sharespace.ShareSpaceApplication;
import mk.ukim.finki.sharespace.model.abstraction.BaseEntity;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.enumeration.OfferType;
import mk.ukim.finki.sharespace.model.enumeration.TransportVehicle;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Data
@Entity
@Table(name = "sharespace_offer")
@EqualsAndHashCode(callSuper = true)
public class Offer extends BaseEntity {

    @Transient
    public static Comparator<Offer> byCreatorOrIdComparatorAscending = Comparator.comparing(Offer::getCreatorName).thenComparing(Offer::getId);

    @Transient
    public static Comparator<Offer> byCreatorOrIdComparatorDescending = Comparator.comparing(Offer::getCreatorName).reversed().thenComparing(Offer::getId);

    @Transient
    public static Comparator<Offer> byDateAndTimeOrIdComparatorAscending = Comparator.comparing(Offer::getStartDateAsDate).thenComparing(Offer::getId);

    @Transient
    public static Comparator<Offer> byDateAndTimeOrIdComparatorDescending = Comparator.comparing(Offer::getStartDateAsDate).reversed().thenComparing(Offer::getId);

    @Transient
    public static Comparator<Offer> byPersonLimitOrIdComparatorAscending = Comparator.comparing(Offer::getPersonLimit).thenComparing(Offer::getId);

    @Transient
    public static Comparator<Offer> byPersonLimitOrIdComparatorDescending = Comparator.comparing(Offer::getPersonLimit).reversed().thenComparing(Offer::getId);

    @Transient
    public static Comparator<Offer> byDestinationOrIdComparatorAscending = Comparator.comparing(Offer::getDestination).thenComparing(Offer::getId);

    @Transient
    public static Comparator<Offer> byDestinationOrIdComparatorDescending = Comparator.comparing(Offer::getDestination).reversed().thenComparing(Offer::getId);


    @Enumerated(EnumType.STRING)
    private OfferType offerType;

    @Enumerated(EnumType.STRING)
    private TransportVehicle transportVehicle;

    private String publishedAt;
    private String startDate;
    private String expirationDate;

    private String city;
    private String municipality;

    private int personLimit;

    @ManyToOne
    private User creator;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "sharespace_offer_participants",
            joinColumns = @JoinColumn(name = "offer_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> participants = new HashSet<>();

    private String destination;

    @ElementCollection
    @CollectionTable(name="sharespace_offer_rendezvouspoints", joinColumns=@JoinColumn(name="offer_id"))
    @Column(name="rendezvous_point")
    private Set<String> rendezvousPoints;

    public Offer() {}

    public Offer(OfferType offerType, TransportVehicle transportVehicle, String startDate, String city, String municipality, int personLimit, User creator, String destination, Set<String> rendezvousPoints) {
        this.offerType = offerType;
        this.transportVehicle = transportVehicle;
        this.city = city;
        this.municipality = municipality;
        this.personLimit = personLimit;
        this.creator = creator;
        this.destination = destination;
        this.rendezvousPoints = rendezvousPoints;

        LocalDateTime now = LocalDateTime.now();
        this.publishedAt = now.format(ShareSpaceApplication.formatter);

        LocalDateTime startDateTime = LocalDateTime.parse(startDate, ShareSpaceApplication.formatter);
        this.startDate = startDateTime.format(ShareSpaceApplication.formatter);

        LocalDateTime expirationDateTime = LocalDateTime.parse(startDate, ShareSpaceApplication.formatter).minusMinutes(30);
        this.expirationDate = expirationDateTime.format(ShareSpaceApplication.formatter);
    }

    public String getCreatorName() {
        return this.creator.getFirstName() + " " + this.creator.getLastName();
    }

    public LocalDateTime getStartDateAsDate() {
        return LocalDateTime.parse(this.getStartDate(), ShareSpaceApplication.formatter);
    }

}
