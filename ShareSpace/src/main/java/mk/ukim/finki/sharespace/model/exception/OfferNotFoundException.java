package mk.ukim.finki.sharespace.model.exception;

import mk.ukim.finki.sharespace.model.exception.parent.ResourceNotFoundException;

public class OfferNotFoundException extends ResourceNotFoundException {

    public OfferNotFoundException(String message) {
        super(message);
    }

}
