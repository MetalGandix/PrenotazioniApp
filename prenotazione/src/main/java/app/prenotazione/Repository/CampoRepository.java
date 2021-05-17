package app.prenotazione.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.prenotazione.Entity.prenotazione_campo.Campo;

public interface CampoRepository extends JpaRepository<Campo, Long>{
    
}
