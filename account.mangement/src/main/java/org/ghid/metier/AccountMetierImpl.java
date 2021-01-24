package org.ghid.metier;

import java.util.List;
import java.util.Optional;

import org.ghid.dao.AccountRepository;
import org.ghid.entities.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class AccountMetierImpl implements AccountMetier {
	@Autowired
	private AccountRepository accountRepository;

	@Override
	public Account saveAccount(Account c) {
		// TODO Auto-generated method stub
		return accountRepository.insert(c);
	}

	@Override
	public List<Account> listAccount() {
		// TODO Auto-generated method stub
		return accountRepository.findAll();
	}

	@Override
	public Optional<Account> findbyId(String id) {
		// TODO Auto-generated method stub
		return accountRepository.findById(id);
	}

	@Override
	public Account updatAccount(Account c) {
		// TODO Auto-generated method stub
		return accountRepository.save(c);
	}

	@Override
	public void deleteAccount(String id) {
		// TODO Auto-generated method stub
		this.accountRepository.deleteById(id);
	}

}
