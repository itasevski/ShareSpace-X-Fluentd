package mk.ukim.finki.sharespace.repository;

import mk.ukim.finki.sharespace.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
}
