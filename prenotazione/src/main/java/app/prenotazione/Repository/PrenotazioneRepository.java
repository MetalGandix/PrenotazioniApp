package app.prenotazione.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.prenotazione.Entity.prenotazione_visita.Prenotazione;
import app.prenotazione.Entity.utente.DAOUser;

@Repository
public interface PrenotazioneRepository extends JpaRepository<Prenotazione, Long> {
List<Prenotazione> findByPrenotazioneVisitatore(DAOUser username);
}