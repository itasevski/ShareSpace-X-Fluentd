package mk.ukim.finki.sharespace.model.exception;

import mk.ukim.finki.sharespace.model.exception.parent.BadRequestException;

public class UsernameExistsException extends BadRequestException {

    public UsernameExistsException(String message) {
        super(message);
    }

}
