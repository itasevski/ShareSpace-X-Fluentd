package mk.ukim.finki.sharespace.repository;

import mk.ukim.finki.sharespace.model.Notification;
import mk.ukim.finki.sharespace.model.abstraction.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {

    List<Notification> findByRecipient(User recipient);

    void deleteByRecipient(User recipient);

}
