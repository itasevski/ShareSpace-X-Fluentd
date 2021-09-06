package mk.ukim.finki.sharespace.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SortDto {

    private String criteria;

    @JsonProperty
    private boolean isAscending;

}
