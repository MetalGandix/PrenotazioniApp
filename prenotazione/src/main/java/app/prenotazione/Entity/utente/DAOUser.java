package app.prenotazione.Entity.utente;
import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Table(name = "user")
public class DAOUser implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String username;

	@Column
	private String password;

	@Column
	private String name;

	@Column
	private String lastname;

	@Column
	private String cellulare;

	@Column
	private boolean privacy_accett;

	@Column
	private boolean is_socio;

	@Column
	private boolean checkbox3;

	@Column
	private boolean isEnabled;

	public boolean isEnabled() {
		return isEnabled;
	}

	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	// role based
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "USER_ROLES", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = {
	@JoinColumn(name = "ROLE_ID") })
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Set<Role> roles;

	public long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getlastname() {
		return lastname;
	}

	public void setlastname(String lastname) {
		this.lastname = lastname;
	}

	public String getCellulare() {
		return cellulare;
	}

	public void setCellulare(String cellulare) {
		this.cellulare = cellulare;
	}

	public boolean isPrivacy_accett() {
		return privacy_accett;
	}

	public void setPrivacy_accett(boolean privacy_accett) {
		this.privacy_accett = privacy_accett;
	}

	public boolean isSocio() {
		return is_socio;
	}

	public void setSocio(boolean is_socio) {
		this.is_socio = is_socio;
	}

	public boolean isCheckbox3() {
		return checkbox3;
	}

	public void setCheckbox3(boolean checkbox3) {
		this.checkbox3 = checkbox3;
	}

}