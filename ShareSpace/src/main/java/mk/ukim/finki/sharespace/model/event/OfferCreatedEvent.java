package mk.ukim.finki.sharespace.model.event;

import mk.ukim.finki.sharespace.ShareSpaceApplication;
import mk.ukim.finki.sharespace.model.Offer;
import mk.ukim.finki.sharespace.model.enumeration.OfferType;
import org.springframework.context.ApplicationEvent;

import java.time.LocalDateTime;

public class OfferCreatedEvent extends ApplicationEvent {

    private String targetCity;
    private String targetMunicipality;
    private String creatorFullName;
    private String creatorId;
    private OfferType offerType;
    private LocalDateTime timestamp;

    public OfferCreatedEvent(Offer source) {
        super(source);
        this.targetCity = source.getCity();
        this.targetMunicipality = source.getMunicipality();
        this.creatorFullName = source.getCreator().getFullName();
        this.creatorId = source.getCreator().getId();
        this.offerType = source.getOfferType();
        this.timestamp = LocalDateTime.now();
    }

    public String getTargetCity() {
        return this.targetCity;
    }

    public String getTargetMunicipality() {
        return this.targetMunicipality;
    }

    public String getCreatorFullName() {
        return this.creatorFullName;
    }

    public String getCreatorId() {
        return this.creatorId;
    }

    public OfferType getOfferType() {
        return this.offerType;
    }

    public String getEventTimestamp() {
        return this.timestamp.format(ShareSpaceApplication.formatter);
    }

}
