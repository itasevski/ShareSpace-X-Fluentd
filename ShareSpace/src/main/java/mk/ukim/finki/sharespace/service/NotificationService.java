package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.Notification;
import mk.ukim.finki.sharespace.model.dto.NotificationDto;

import java.util.List;
import java.util.Optional;

public interface NotificationService {

    Optional<Notification> create(NotificationDto notificationDto);

    List<Notification> findByRecipientId(String recipientId);

    void deleteByRecipientId(String recipientId);

}
