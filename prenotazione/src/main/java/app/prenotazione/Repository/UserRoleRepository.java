package app.prenotazione.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.prenotazione.Entity.utente.UserRole;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

}