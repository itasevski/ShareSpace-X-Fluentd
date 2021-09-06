package mk.ukim.finki.sharespace.listener;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.NotificationDto;
import mk.ukim.finki.sharespace.model.enumeration.NotificationType;
import mk.ukim.finki.sharespace.model.enumeration.OfferType;
import mk.ukim.finki.sharespace.model.event.OfferCreatedEvent;
import mk.ukim.finki.sharespace.service.NotificationService;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class OfferCreatedEventHandler {

    private final UserService userService;
    private final NotificationService notificationService;

    @EventListener
    public void onOfferCreated(OfferCreatedEvent event) {
        List<User> sample = this.userService.findByCityAndMunicipality(event.getTargetCity(), event.getTargetMunicipality());

        NotificationType notificationType;
        if(event.getOfferType() == OfferType.DRIVER_OFFER) {
            notificationType = NotificationType.DRIVER_OFFER_CREATED_NEAR_USER;
        }
        else {
            notificationType = NotificationType.PASSENGER_OFFER_CREATED_NEAR_USER;
        }

        for(User u : sample) {
            if(u.getId().equals(event.getCreatorId())) {
                continue;
            }

            NotificationDto notificationDto = new NotificationDto(
                    notificationType,
                    event.getCreatorFullName() + " created an offer in your region.",
                    u.getId());
            this.notificationService.create(notificationDto);
        }
    }

}
