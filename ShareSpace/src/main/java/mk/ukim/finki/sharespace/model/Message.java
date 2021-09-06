package mk.ukim.finki.sharespace.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mk.ukim.finki.sharespace.ShareSpaceApplication;
import mk.ukim.finki.sharespace.model.abstraction.BaseEntity;
import mk.ukim.finki.sharespace.model.abstraction.User;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "sharespace_message")
@EqualsAndHashCode(callSuper = true)
public class Message extends BaseEntity {

    private String subject;
    private String body;
    private String sentAt;

    @ManyToOne
    private User sender;

    public Message() {}

    public Message(String subject, String body, User sender) {
        this.subject = subject;
        this.body = body;
        this.sender = sender;

        LocalDateTime now = LocalDateTime.now();
        this.sentAt = now.format(ShareSpaceApplication.formatter);
    }

}
