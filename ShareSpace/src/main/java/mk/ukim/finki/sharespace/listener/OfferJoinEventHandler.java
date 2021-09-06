package mk.ukim.finki.sharespace.listener;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.NotificationDto;
import mk.ukim.finki.sharespace.model.enumeration.NotificationType;
import mk.ukim.finki.sharespace.model.event.OfferJoinEvent;
import mk.ukim.finki.sharespace.service.NotificationService;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OfferJoinEventHandler {

    private final UserService userService;
    private final NotificationService notificationService;

    @EventListener
    public void onOfferJoin(OfferJoinEvent event) {
        User offerCreator = this.userService.findById(event.getOfferCreatorId());
        User joinedUser = this.userService.findById(event.getJoinedUserId());

        NotificationDto notificationDto = new NotificationDto(
                NotificationType.USER_JOIN,
                joinedUser.getFullName() + " (" + joinedUser.getUsername() + ") " + "has joined your offer.",
                offerCreator.getId());

        this.notificationService.create(notificationDto);
    }

}
