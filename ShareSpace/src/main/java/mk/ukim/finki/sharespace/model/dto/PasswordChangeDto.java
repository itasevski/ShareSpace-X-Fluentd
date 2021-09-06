package mk.ukim.finki.sharespace.model.dto;

import lombok.Data;

@Data
public class PasswordChangeDto {

    private String oldPassword;
    private String newPassword;
    private String confirmNewPassword;

}
