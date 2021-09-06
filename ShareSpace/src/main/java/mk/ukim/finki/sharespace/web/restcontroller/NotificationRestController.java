package mk.ukim.finki.sharespace.web.restcontroller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Notification;
import mk.ukim.finki.sharespace.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationRestController {

    private final NotificationService notificationService;

    @GetMapping("/find-recipientid/{id}")
    public List<Notification> findByRecipientId(@PathVariable String id) {
        return this.notificationService.findByRecipientId(id);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<String> deleteByRecipientId(@PathVariable String id) {
        this.notificationService.deleteByRecipientId(id);
        return ResponseEntity.ok("Successfully deleted notification.");
    }

}
