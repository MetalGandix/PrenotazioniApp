package app.prenotazione.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.prenotazione.Entity.prenotazione_campo.PrenotazioneCampoEffettuata;
import app.prenotazione.Entity.utente.DAOUser;

@Repository
public interface PrenotazioneCampoEffettuataRepository extends JpaRepository<PrenotazioneCampoEffettuata, Long>{
    List<PrenotazioneCampoEffettuata> findByUtentePrenotazione(DAOUser username);
}
