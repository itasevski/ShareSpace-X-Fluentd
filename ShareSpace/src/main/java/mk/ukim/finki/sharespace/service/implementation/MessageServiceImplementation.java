package mk.ukim.finki.sharespace.service.implementation;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Message;
import mk.ukim.finki.sharespace.model.abstraction.User;
import mk.ukim.finki.sharespace.model.dto.MessageDto;
import mk.ukim.finki.sharespace.repository.MessageRepository;
import mk.ukim.finki.sharespace.service.MessageService;
import mk.ukim.finki.sharespace.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MessageServiceImplementation implements MessageService {

    private final MessageRepository messageRepository;
    private final UserService userService;

    @Override
    public Optional<Message> create(MessageDto messageDto) {
        User user = this.userService.findById(messageDto.getUserId());
        Message message = new Message(messageDto.getSubject(), messageDto.getBody(), user);

        return Optional.of(this.messageRepository.save(message));
    }

}
