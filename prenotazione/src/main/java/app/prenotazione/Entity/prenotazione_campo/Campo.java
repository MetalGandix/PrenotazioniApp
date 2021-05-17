package app.prenotazione.Entity.prenotazione_campo;
import javax.persistence.*;

@Entity
@Table(name = "campo")
public class Campo {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column
	private int numCampo;

    @Column
	private boolean illuminazione;

    @Column
	private boolean utilizzato;

    @Column
	private String nome;

    public long getId() {
        return id;
    }

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

    public boolean isUtilizzato() {
        return utilizzato;
    }

    public void setUtilizzato(boolean utilizzato) {
        this.utilizzato = utilizzato;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }


    
}
