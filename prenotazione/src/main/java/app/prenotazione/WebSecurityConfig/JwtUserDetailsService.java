package app.prenotazione.WebSecurityConfig;


import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.prenotazione.Entity.DAOUser;
import app.prenotazione.Entity.UserRole;
import app.prenotazione.Repository.UserDaoRepository;
import app.prenotazione.Repository.UserRoleRepository;


//@Service 
@Service(value = "userService") //role based
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserDaoRepository userDao;

	@Autowired
	private UserRoleRepository userRoleRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		DAOUser user = userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		//return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),	new ArrayList<>());
		//role based
		org.springframework.security.core.userdetails.User u = new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
		return u;
	}

	public DAOUser findUserByUsername(String username){
		return userDao.findByUsername(username);
	}

	public List<DAOUser> findAllTheUser(){
		return (List<DAOUser>) userDao.findAll();
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
		newUser.setCheckbox1(user.isCheckbox1());
		newUser.setCheckbox2(user.isCheckbox2());
		newUser.setCheckbox3(user.isCheckbox3());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		DAOUser saved = userDao.save(newUser);
		UserRole newUserRole = new UserRole();
		newUserRole.setRole_id(1);
		newUserRole.setUser_id(saved.getId());
		userRoleRepository.save(newUserRole);
		return saved;
	}

}