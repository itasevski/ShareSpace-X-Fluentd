package mk.ukim.finki.sharespace.model.exception;

import mk.ukim.finki.sharespace.model.exception.parent.ResourceNotFoundException;

public class NotificationNotFoundException extends ResourceNotFoundException {

    public NotificationNotFoundException(String message) {
        super(message);
    }

}
