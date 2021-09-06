package mk.ukim.finki.sharespace.model.exception;

import mk.ukim.finki.sharespace.model.exception.parent.BadRequestException;

public class EmailExistsException extends BadRequestException {

    public EmailExistsException(String message) {
        super(message);
    }

}
