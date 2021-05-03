package app.prenotazione.Controller;
import java.util.List;
// import javax.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
//import app.prenotazione.SmtpMailSender;
import app.prenotazione.Entity.DAOUser;
import app.prenotazione.Entity.UserDTO;
import app.prenotazione.WebSecurityConfig.JwtUserDetailsService;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private JwtUserDetailsService userRepository;

    // @Autowired
    // private SmtpMailSender smtpMailSender;

    @PostMapping("/user")
    String addUser(@RequestBody UserDTO user){
        //smtpMailSender.send(user.getUsername(), "Prova", "Conferma la tua email");
        userRepository.save(user);
        return "ciao";
    }

    @GetMapping("/existUser/{username}")
    public boolean existUser(@PathVariable String username) {
        if (userRepository.findUserByUsername(username) == null) {
            return false;
        } else {
            return true;
        }
    }

    @GetMapping("/vediUtenti")
    public List<DAOUser> vediUtenti(Authentication a) {
        return (List<DAOUser>) userRepository.findAllTheUser();
    }

    @GetMapping("/vediUtenti/{username}")
    public DAOUser vediUtente(Authentication a, @PathVariable String username) {
        return (DAOUser) userRepository.findUserByUsername(username);
    }

    @PutMapping("/cambiaUtente/{usernameid}")
    public DAOUser cambiaUtente(Authentication a, @RequestBody UserDTO username) {
        return (DAOUser) userRepository.save(username);
    }
}