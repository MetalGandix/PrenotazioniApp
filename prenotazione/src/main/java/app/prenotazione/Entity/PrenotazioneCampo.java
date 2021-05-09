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
@Table(name = "prenotazioneCampo")
public class PrenotazioneCampo {
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
    private DAOUser prenotazioneCampo;

    public int getNumCampo() {
        return numCampo;
    }

    public void setNumCampo(int numCampo) {
        this.numCampo = numCampo;
    }

    public boolean isIlluminazione() {
        return illuminazione;
    }

    public void setIlluminazione(boolean illuminazione) {
        this.illuminazione = illuminazione;
    }

    public boolean isPrenotato() {
        return prenotato;
    }

    public void setPrenotato(boolean prenotato) {
        this.prenotato = prenotato;
    }

    public DAOUser getPrenotazioneCampo() {
        return prenotazioneCampo;
    }

    public void setPrenotazioneCampo(DAOUser prenotazioneCampo) {
        this.prenotazioneCampo = prenotazioneCampo;
    }

    public long getId() {
        return id;
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

   

}