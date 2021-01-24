package org.ghid.services;

import java.util.List;
import java.util.Optional;

import org.ghid.entities.Account;
import org.ghid.metier.AccountMetier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AcountRestService {
	@Autowired
	private AccountMetier accountMetier;
    @RequestMapping(value = "/Account",method = RequestMethod.POST)
	public Account saveAccount(@RequestBody Account c) {
		return accountMetier.saveAccount(c);
	}
    @RequestMapping(value = "/Account",method = RequestMethod.GET)
	public List<Account> listAccount() {
		return accountMetier.listAccount(); 
	}
    @RequestMapping(value = "/Account/{id}",method = RequestMethod.GET)
	public Optional<Account> findbyId(@PathVariable("id") String id ) {
		Optional<Account> account= this.accountMetier.findbyId(id);
		return account; 
	}
    @RequestMapping(value = "/Account/{id}",method = RequestMethod.PUT)
	public Account updatAccount(@RequestBody Account c,@PathVariable("id") String id) {
    	c.setId(id);
		return accountMetier.updatAccount(c);
	}
    @RequestMapping(value = "/Account/{id}",method = RequestMethod.DELETE)
    public void deleteAccount(@PathVariable("IdAccount") String id ) {
		this.accountMetier.deleteAccount(id);
		 
	}

}
