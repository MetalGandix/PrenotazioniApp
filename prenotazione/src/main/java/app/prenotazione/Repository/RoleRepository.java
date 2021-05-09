package app.prenotazione.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import app.prenotazione.Entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
    Role findById(long id);
}
