package mk.ukim.finki.sharespace.repository;

import mk.ukim.finki.sharespace.model.abstraction.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    List<User> findByCityAndMunicipality(String city, String municipality);

}
