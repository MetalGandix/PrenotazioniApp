package app.prenotazione.Controller;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import javax.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import app.prenotazione.Entity.prenotazione_campo.PrenotazioneCampo;
import app.prenotazione.Entity.utente.DAOUser;
import app.prenotazione.Jwt.JwtUserDetailsService;
import app.prenotazione.Repository.PrenotazioneCampoRepository;
import app.prenotazione.Entity.prenotazione_campo.Campo;

@RestController
@CrossOrigin
public class PrenotazioneCampoController {

    @Autowired
    private PrenotazioneCampoRepository campoRep;

    @Autowired
    private JwtUserDetailsService userRepository;

    @PostMapping("/prenotazioneCampo")
    String addPrenotazione(Authentication a, @RequestBody PrenotazioneCampo prenotazione) throws MessagingException{
        campoRep.save(prenotazione);
        return "Visita correttamente inviata";
    }

    @GetMapping("/prendiUtenteLoggatoxCampi/{username}")
    public DAOUser prendiUtenteLoggatoxCampi(Authentication a) {
        UserDetails userPrincipal = (UserDetails)a.getPrincipal();
        return (DAOUser) userRepository.findUserByUsername(userPrincipal.getUsername());
    }

    // Metodo per vedere TUTTE le prenotazioni campi degli utenti (Deve essere accessibile solo all'admin)
    @GetMapping("/vediprenotazioniCampi")
    public List<PrenotazioneCampo> getVisite(Authentication a) {
        List<PrenotazioneCampo> prenotazione = campoRep.findAll();
        return prenotazione ;
    }

    // Metodo per vedere una singola prenotazione dell'utente
    @GetMapping("/vediPrenotazioneCampo/{id}")
    public Optional<PrenotazioneCampo> vediPrenotazioniCampiUtente(Authentication a, @PathVariable Long id) {
        return (Optional<PrenotazioneCampo>) campoRep.findById(id);
    }

    @DeleteMapping("/cancellaPrenotazioneCampo/{id}")
    public String deletePrenotazione(Authentication a, @PathVariable long id){
        PrenotazioneCampo prenotazione = campoRep.getOne(id);
        campoRep.delete(prenotazione);
        return "Prenotazione Campo correttamente eliminata";
    }

    @GetMapping("/prendiPrenotazioneCampoUtente/{prenotazioneVisitatore}")
    public List<PrenotazioneCampo> prendiVisitaDaUtente(Authentication a) {
        UserDetails userPrincipal = (UserDetails)a.getPrincipal();
        DAOUser utente = userRepository.findUserByUsername(userPrincipal.getUsername());
        return (List<PrenotazioneCampo>) campoRep.findByUtentePrenotazione(utente);
    }

    @PutMapping("/prenotaCampo/{id}")
    public String prenotaCampo(Authentication authentication, @RequestBody Campo campo, @PathVariable Long id){
        UserDetails userPrincipal = (UserDetails)authentication.getPrincipal();
        DAOUser utente = userRepository.findUserByUsername(userPrincipal.getUsername());
        Optional<PrenotazioneCampo> prenotazione = campoRep.findById(id);
        prenotazione.get().setCampo(campo);
        prenotazione.get().setPrenotazioneCampo(utente);
        prenotazione.get().setPrenotato(true);
        campoRep.save(prenotazione.get());
        return "Prenotazione aggiornata correttamente";
    }

    @GetMapping("/prendiPrenotazioneCampoUtenteByData/{data}")
    public List<PrenotazioneCampo> vediCampiConData(Authentication authentication, @PathVariable String data){
        LocalDate date = LocalDate.parse(data);
        return (List<PrenotazioneCampo>) campoRep.findByData(date);
    } 
}