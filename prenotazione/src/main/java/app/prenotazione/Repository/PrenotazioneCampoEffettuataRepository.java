package app.prenotazione.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.prenotazione.Entity.DAOUser;
import app.prenotazione.Entity.PrenotazioneCampoEffettuata;

@Repository
public interface PrenotazioneCampoEffettuataRepository extends JpaRepository<PrenotazioneCampoEffettuata, Long>{
    List<PrenotazioneCampoEffettuata> findByPrenotazioneCampo(DAOUser username);
}
