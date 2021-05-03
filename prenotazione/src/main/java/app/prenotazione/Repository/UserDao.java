package app.prenotazione.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import app.prenotazione.Entity.DAOUser;


@Repository
public interface UserDao extends JpaRepository<DAOUser, Long> {
	
	DAOUser findByUsername(String username);
}