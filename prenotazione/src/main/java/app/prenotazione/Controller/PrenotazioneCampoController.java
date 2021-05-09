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

import app.prenotazione.Entity.PrenotazioneCampo;
import app.prenotazione.Jwt.JwtUserDetailsService;
import app.prenotazione.Repository.PrenotazioneCampoRepository;


@RestController
@CrossOrigin
public class PrenotazioneCampoController {

    @Autowired
    private PrenotazioneCampoRepository campoRep;

    @Autowired
    private SmtpMailSender smtpMailSender;

    @Autowired
    private JwtUserDetailsService userRepository;

    @PostMapping("/prenotazioneCampo")
    String addCampo(Authentication a, @RequestBody PrenotazioneCampo campo) throws MessagingException{
        smtpMailSender.send("prenotazioni.app.padel@gmail.com", "Prenotazione campo" , "Visita prenotata da " + campo.getPrenotazioneCampo().getlastname() + " \nper il giorno: " + campo.getData() + " alle ore: " + campo.getOrario());
        campo.setPrenotazioneCampo(prendiUtenteLoggatoxCampi(a));
        campoRep.save(campo);
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
        return (List<PrenotazioneCampo>) campoRep.findByPrenotazioneCampo(utente);
    }
}