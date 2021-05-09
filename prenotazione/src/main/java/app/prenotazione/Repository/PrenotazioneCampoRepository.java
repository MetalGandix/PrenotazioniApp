package app.prenotazione.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import app.prenotazione.Entity.DAOUser;
import app.prenotazione.Entity.PrenotazioneCampo;

@Repository
public interface PrenotazioneCampoRepository extends JpaRepository<PrenotazioneCampo, Long> {
    List<PrenotazioneCampo> findByPrenotazioneCampo(DAOUser username);
}