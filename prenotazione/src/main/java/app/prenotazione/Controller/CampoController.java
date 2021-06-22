package app.prenotazione.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import app.prenotazione.Entity.prenotazione_campo.Campo;
import app.prenotazione.Repository.CampoRepository;

@RestController
@CrossOrigin
public class CampoController {
    
    @Autowired
    private CampoRepository rep;

    @GetMapping("/getCampi")
    public List<Campo> getVisite(Authentication a) {
        List<Campo> prenotazione = rep.findAll();
        return prenotazione ;
    }

}
