package org.ghid.metier;

import java.util.List;
import java.util.Optional;

import org.ghid.entities.Account;

public interface AccountMetier {
	public Account saveAccount(Account c) ;
	public List<Account> listAccount() ;
	Optional<Account> findbyId(String id);
	public Account updatAccount(Account c) ;
	public void deleteAccount(String id);
	
	
	
	
}
