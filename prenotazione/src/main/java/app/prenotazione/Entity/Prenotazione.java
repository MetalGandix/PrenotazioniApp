package app.prenotazione.Entity;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "prenotazione")
public class Prenotazione {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column
    private LocalDate data;

    @Column
    private String orario;

    @Column
    private int numCampo;

    @Column
    private boolean illuminazione;
    
    @Column
    private boolean prenotato;

    @Column
    private String infoAggiuntiva;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_USERNAME", referencedColumnName="username")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DAOUser prenotazioneVisitatore;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getOrario() {
        return orario;
    }

    public void setOrario(String orario) {
        this.orario = orario;
    }

    public String getInfoAggiuntiva() {
        return infoAggiuntiva;
    }

    public void setInfoAggiuntiva(String infoAggiuntiva) {
        this.infoAggiuntiva = infoAggiuntiva;
    }

    public DAOUser getPrenotazioneVisitatore() {
        return prenotazioneVisitatore;
    }

    public void setPrenotazioneVisitatore(DAOUser prenotazioneVisitatore) {
        this.prenotazioneVisitatore = prenotazioneVisitatore;
    }

}