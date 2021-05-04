package app.prenotazione.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import app.prenotazione.Entity.DAOUser;
import app.prenotazione.Entity.PrenotazioneVisita;

@Repository
public interface PrenotazioneVisitaRepository extends JpaRepository<PrenotazioneVisita, Long> {
List<PrenotazioneVisita> findByPrenotazioneVisitatore(DAOUser username);
}