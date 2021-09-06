package mk.ukim.finki.sharespace.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mk.ukim.finki.sharespace.ShareSpaceApplication;
import mk.ukim.finki.sharespace.model.abstraction.BaseEntity;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.enumeration.NotificationType;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "sharespace_notification")
public class Notification extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    private String description;
    private String receivedAt;

    @ManyToOne
    private User recipient;

    public Notification() {}

    public Notification(NotificationType type, String description, User recipient) {
        this.type = type;
        this.description = description;
        this.recipient = recipient;

        LocalDateTime now = LocalDateTime.now();
        this.receivedAt = now.format(ShareSpaceApplication.formatter);
    }

}
