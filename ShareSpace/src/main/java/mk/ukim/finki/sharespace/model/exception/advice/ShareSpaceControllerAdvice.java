package mk.ukim.finki.sharespace.model.exception.advice;

import mk.ukim.finki.sharespace.model.exception.parent.BadRequestException;
import mk.ukim.finki.sharespace.model.exception.parent.ResourceNotFoundException;
import mk.ukim.finki.sharespace.model.exception.response.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ShareSpaceControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleResourceNotFound(ResourceNotFoundException exception, WebRequest request) {
        return handleExceptionInternal(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionResponse> handleBadRequest(BadRequestException exception, WebRequest request) {
        return handleExceptionInternal(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // ===

    public ResponseEntity<ExceptionResponse> handleExceptionInternal(String message, HttpStatus httpStatus) {
        ExceptionResponse response = new ExceptionResponse(message);

        return new ResponseEntity<>(response, httpStatus);
    }

}
