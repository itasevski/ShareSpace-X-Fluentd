package mk.ukim.finki.sharespace.model.exception.response;

import lombok.Data;

import java.util.Date;

@Data
public class ExceptionResponse {

    private String errorMessage;
    private String timestamp;

    public ExceptionResponse(String errorMessage) {
        this.errorMessage = errorMessage;
        this.timestamp = new Date().toString();
    }

}
