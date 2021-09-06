package mk.ukim.finki.sharespace.service;

import mk.ukim.finki.sharespace.model.Offer;
import mk.ukim.finki.sharespace.model.dto.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface OfferService {

    List<Offer> getAll();

    Set<Offer> getAllCustom();

    List<Offer> getBySortCriteria(SortDto sortDto);

    Set<Offer> getByQueryString(String queryString);

    List<Offer> getByFilterCriteria(FilterDto filterDto);

    void offerJoin(OfferJoinDto offerJoinDto);

    Optional<Offer> create(OfferDto offerDto);

    Offer findById(String id);

    void delete(String id);

}
