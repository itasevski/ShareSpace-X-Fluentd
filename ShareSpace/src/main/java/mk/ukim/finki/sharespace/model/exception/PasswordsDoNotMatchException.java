package mk.ukim.finki.sharespace.model.exception;

import mk.ukim.finki.sharespace.model.exception.parent.BadRequestException;

public class PasswordsDoNotMatchException extends BadRequestException {

    public PasswordsDoNotMatchException(String message) {
        super(message);
    }

}
