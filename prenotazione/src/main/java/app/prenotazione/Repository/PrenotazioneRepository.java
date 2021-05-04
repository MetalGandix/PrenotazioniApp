package app.prenotazione.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import app.prenotazione.Entity.DAOUser;
import app.prenotazione.Entity.Prenotazione;

@Repository
public interface PrenotazioneRepository extends JpaRepository<Prenotazione, Long> {
List<Prenotazione> findByPrenotazioneVisitatore(DAOUser username);
}