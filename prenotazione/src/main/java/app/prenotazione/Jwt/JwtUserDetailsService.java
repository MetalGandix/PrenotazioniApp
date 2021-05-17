package app.prenotazione.Jwt;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.prenotazione.Entity.utente.DAOUser;
import app.prenotazione.Entity.utente.UserRole;
import app.prenotazione.Repository.UserDaoRepository;
import app.prenotazione.Repository.UserRoleRepository;

@Service(value = "userService") //role based
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserDaoRepository repository;

	@Autowired
	private UserRoleRepository userRoleRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		DAOUser user = repository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		//return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),	new ArrayList<>());
		//role based
		org.springframework.security.core.userdetails.User u = new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
		return u;
	}

	public DAOUser findUserByUsername(String username){
		return repository.findByUsername(username);
	}

	public List<DAOUser> findAllTheUser(){
		return (List<DAOUser>) repository.findAll();
	}

	//role based
	private Set<GrantedAuthority> getAuthority(DAOUser user) { //Prende i ruoli
        Set<GrantedAuthority> authorities = new HashSet<>();
		user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
		});
		return authorities;
	}

	public DAOUser save(DAOUser user) {
		DAOUser newUser = new DAOUser();
		newUser.setUsername(user.getUsername());
		newUser.setName(user.getName());
		newUser.setlastname(user.getlastname());
		newUser.setCellulare(user.getCellulare());
		newUser.setPrivacy_accett(user.isPrivacy_accett());
		newUser.setSocio(user.isSocio());
		newUser.setCheckbox3(user.isCheckbox3());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		DAOUser saved = repository.save(newUser);
		UserRole newUserRole = new UserRole();
		newUserRole.setRole_id(1);
		newUserRole.setUser_id(saved.getId());
		userRoleRepository.save(newUserRole);
		return saved;
	}
}