package mk.ukim.finki.sharespace.web.restcontroller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.sharespace.model.Offer;
import mk.ukim.finki.sharespace.model.dto.*;
import mk.ukim.finki.sharespace.service.OfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("/api/offers")
public class OfferRestController {

    private final OfferService offerService;

    @GetMapping
    public Set<Offer> getAll(@RequestParam(required = false) String queryString) {
        if(queryString != null && !queryString.isEmpty() && !queryString.isBlank()) {
            return this.offerService.getByQueryString(queryString);
        }
        return this.offerService.getAllCustom();
    }

    @PostMapping("/sorted")
    public List<Offer> getSorted(@RequestBody SortDto sortDto) {
        return this.offerService.getBySortCriteria(sortDto);
    }

    @PostMapping("/filtered")
    public List<Offer> getFiltered(@RequestBody FilterDto filterDto) {
        return this.offerService.getByFilterCriteria(filterDto);
    }

    @PostMapping("/join")
    public ResponseEntity<String> offerJoin(@RequestBody OfferJoinDto offerJoinDto) {
        this.offerService.offerJoin(offerJoinDto);

        return ResponseEntity.ok("User successfully joined offer.");
    }

    @PostMapping("/create")
    public ResponseEntity<Offer> create(@RequestBody OfferDto offerDto) {
        return this.offerService.create(offerDto)
                .map(offer -> ResponseEntity.ok().body(offer))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        this.offerService.delete(id);
        return ResponseEntity.ok("Successfully deleted offer with id " + id);
    }

}
