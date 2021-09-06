package mk.ukim.finki.sharespace.model.event;

import mk.ukim.finki.sharespace.model.Offer;
import org.springframework.context.ApplicationEvent;

public class OfferJoinEvent extends ApplicationEvent {

    private String offerCreatorId;
    private String joinedUserId;

    public OfferJoinEvent(Offer source, String joinedUserId) {
        super(source);
        this.offerCreatorId = source.getCreator().getId();
        this.joinedUserId = joinedUserId;
    }

    public String getOfferCreatorId() {
        return this.offerCreatorId;
    }

    public String getJoinedUserId() {
        return this.joinedUserId;
    }

}
