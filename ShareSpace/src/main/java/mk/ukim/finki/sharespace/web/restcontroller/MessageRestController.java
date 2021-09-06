package mk.ukim.finki.sharespace.web.restcontroller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Message;
import mk.ukim.finki.sharespace.model.dto.MessageDto;
import mk.ukim.finki.sharespace.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/message")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageRestController {

    private final MessageService messageService;

    @PostMapping("/create")
    public ResponseEntity<Message> create(@RequestBody MessageDto messageDto) {
        return this.messageService.create(messageDto)
                .map(message -> ResponseEntity.ok().body(message))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}
