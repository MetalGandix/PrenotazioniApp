package app.prenotazione.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import app.prenotazione.Entity.ConfirmationToken;
import app.prenotazione.Entity.DAOUser;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long>{
    ConfirmationToken findByConfirmationToken(String confirmationToken);
    ConfirmationToken findByUser(DAOUser id);
    ConfirmationToken findByUserId(long id);
}
