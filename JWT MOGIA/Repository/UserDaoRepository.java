package leopardiproject.csd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import leopardiproject.csd.model.DAOUser;

@Repository
public interface UserDaoRepository extends JpaRepository<DAOUser, Integer> {
	
	DAOUser findByUsername(String username);
}