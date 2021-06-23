package app.prenotazione.Repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.prenotazione.Entity.prenotazione_campo.PrenotazioneCampo;
import app.prenotazione.Entity.utente.DAOUser;

@Repository
public interface PrenotazioneCampoRepository extends JpaRepository<PrenotazioneCampo, Long> {
    List<PrenotazioneCampo> findByUtentePrenotazione(DAOUser username);
    List<PrenotazioneCampo> findByData(LocalDate data);
}