package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.Message;
import mk.ukim.finki.sharespace.model.dto.MessageDto;

import java.util.Optional;

public interface MessageService {

    Optional<Message> create(MessageDto messageDto);

}
