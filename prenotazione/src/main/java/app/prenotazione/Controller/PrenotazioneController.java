package app.prenotazione.Controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import app.prenotazione.SmtpMailSender;
import app.prenotazione.Entity.DAOUser;
import app.prenotazione.Entity.Prenotazione;
import app.prenotazione.Jwt.JwtUserDetailsService;
import app.prenotazione.Repository.PrenotazioneRepository;

@RestController
@CrossOrigin
public class PrenotazioneController {

    @Autowired
    private PrenotazioneRepository visitaRep;

    @Autowired
    private SmtpMailSender smtpMailSender;

    @Autowired
    private JwtUserDetailsService userRepository;

    @PostMapping("/visita")
    String addVisit(Authentication a, @RequestBody Prenotazione visita) throws MessagingException{
        visita.setPrenotazioneVisitatore(prendiUtenteLoggato(a));
        smtpMailSender.send("prenotazioni.app.padel@gmail.com", "Prenotazione visita" , "Visita prenotata da " + visita.getPrenotazioneVisitatore().getlastname() + " \nper il giorno: " + visita.getData() + " alle ore: " + visita.getOrario());
        visitaRep.save(visita);
        return "Visita correttamente inviata";
    }

    @GetMapping("/prendiUtenteLoggato/{username}")
    public DAOUser prendiUtenteLoggato(Authentication a) {
        UserDetails userPrincipal = (UserDetails)a.getPrincipal();
        return (DAOUser) userRepository.findUserByUsername(userPrincipal.getUsername());
    }

    // Metodo per vedere TUTTE le visite (Deve essere accessibile solo all'admin)
    @GetMapping("/vediVisite")
    public List<Prenotazione> getVisite(Authentication a) {
        List<Prenotazione> prenotazione = visitaRep.findAll();
        return prenotazione ;
    }
    // Metodo per vedere una singola visita dell'utente
    @GetMapping("/vediVisita/{id}")
    public Optional<Prenotazione> vediVisitaSingola(Authentication a, @PathVariable Long id) {
        return (Optional<Prenotazione>) visitaRep.findById(id);
    }

    @DeleteMapping("/cancellaVisita/{id}")
    public String deletePrenotazione(Authentication a, @PathVariable long id){
        Prenotazione prenotazione = visitaRep.getOne(id);
        visitaRep.delete(prenotazione);
        return "Prenotazione correttamente eliminata";
    }

    @GetMapping("/prendiVisitaUtente/{prenotazioneVisitatore}")
    public List<Prenotazione> prendiVisitaDaUtente(Authentication a) {
        UserDetails userPrincipal = (UserDetails)a.getPrincipal();
        DAOUser utente = userRepository.findUserByUsername(userPrincipal.getUsername());
        return (List<Prenotazione>) visitaRep.findByPrenotazioneVisitatore(utente);
    }
}