package mk.ukim.finki.sharespace.service.implementation;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Notification;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.NotificationDto;
import mk.ukim.finki.sharespace.repository.NotificationRepository;
import mk.ukim.finki.sharespace.service.NotificationService;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class NotificationServiceImplementation implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserService userService;

    @Override
    public Optional<Notification> create(NotificationDto notificationDto) {
        User user = this.userService.findById(notificationDto.getRecipientId());

        Notification notification = new Notification(notificationDto.getType(), notificationDto.getDescription(), user);

        return Optional.of(this.notificationRepository.save(notification));
    }

    @Override
    public List<Notification> findByRecipientId(String recipientId) {
        User user = this.userService.findById(recipientId);

        return this.notificationRepository.findByRecipient(user);
    }

    @Override
    @Transactional
    public void deleteByRecipientId(String recipientId) {
        User user = this.userService.findById(recipientId);

        this.notificationRepository.deleteByRecipient(user);
    }

}
