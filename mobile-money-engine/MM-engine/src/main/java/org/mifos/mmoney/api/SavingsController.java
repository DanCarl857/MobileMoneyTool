package org.mifos.mmoney.api;

import org.springframework.web.bind.annotation.RestController;
import java.util.Date;

import org.mifos.mmoney.dao.TransactionDao;
import org.mifos.mmoney.models.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class SavingsController {

	@SuppressWarnings("unused")
	@CrossOrigin
	@RequestMapping(value="/api/v1/savings", method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
	public 
	@ResponseBody
	ResponseEntity<String> saveMoney(
			@RequestParam(value="phone", required=true)long phoneNumber,
			@RequestParam(value="amount", required=true) long amount,
			@RequestParam(value="clientId", required=true)int clientID){
		
		/*
		 * uri: URL saving money in the mobile money API
		 * TODO: make this generic. So this can be changed from front end application
		 */
		final String uri = "http://gturnquist-quoters.cfapps.io/api/random";
		
		Transactions trans = new Transactions();
		
		trans.setAmount((int) amount);
		trans.setClient_id(clientID);
		trans.setDate(new Date());
		trans.setType("Savings");
		trans.setOffice(trans.getOffice());
		trans.setStaff(trans.getStaff());
		trans.setRecipient("null");
		
		/*
		 * TODO: We now make a request to the Mobile money API
		 */
		// Making sure values are saved in the database.
		try{
			transDao.save(trans);
			return new ResponseEntity<String>("\"Savings success\"", HttpStatus.OK);
		} catch(Exception ex){
			System.out.println("Saving to database error in savings: " + ex.getMessage());
		}
		return new ResponseEntity<String>("Savings failure", HttpStatus.OK);
	}
	
	@Autowired
	private TransactionDao transDao;
}
