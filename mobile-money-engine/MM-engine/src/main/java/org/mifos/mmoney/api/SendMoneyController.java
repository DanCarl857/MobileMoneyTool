package org.mifos.mmoney.api;

import java.util.Date;

import org.mifos.mmoney.dao.TransactionDao;
import org.mifos.mmoney.models.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SendMoneyController {
	
	/*
	 * TODO:
	 * - Make the uri an argument so it can be gotten from the front end application
	 * - response status has to be structured so it matches as many APIs as possible
	 */

	@SuppressWarnings("unused")
	@RequestMapping(value="/api/v1/send", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseEntity<String> sendMoney(
			@RequestParam(value="phone", required=true)long phoneNumber,
			@RequestParam(value="amount", required=true) long amount,
			@RequestParam(value="recipient", required=true)String recipient,
			@RequestParam(value="clientId", required=true)int clientID){
		
		/*
		 * uri: URL for withdrawing money in the mobile money API
		 * 
		 */
		final String uri = "http://gturnquist-quoters.cfapps.io/api/random";
		
		/*
		 * We now make a request to the Mobile money API
		 * TODO: make request to Mobile Money API
		 */
		
		Transactions trans = new Transactions();
			
		trans.setAmount((int) amount);
		trans.setClient_id(clientID);
		trans.setDate(new Date());
		trans.setType("Money transfer");
		trans.setOffice(trans.getOffice());
		trans.setStaff(trans.getStaff());
		trans.setRecipient(recipient);
			
		// Making sure values are saved in the database.
		try{
			transDao.save(trans);
		} catch(Exception ex){
			System.out.println("Saving to database error in money transaction: " + ex.getMessage());
			return new ResponseEntity<String>("Money transfer failure", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<String>("Money transfer success", HttpStatus.OK);
	}
	
	// Data repository.
	@Autowired
	private TransactionDao transDao;
}
