package org.mifos.mmoney.api;

import org.mifos.mmoney.dao.TransactionDao;
import org.mifos.mmoney.models.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionController {
	
	/*
	 * This end point is to avoid sending too much data for each transaction
	 * So each time a staff member logs in, their default data is automatically 
	 * sent to the mobile money engine
	 */
	@SuppressWarnings("unused")
	@RequestMapping(value="/api/v1/create", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseEntity<String> saveTransaction(
			@RequestParam(value="staff", required=true)String staff,
			@RequestParam(value="office", required=true)String office
			){
		Transactions trans = new Transactions();
		
		// Set staff and office values
		trans.setStaff(staff);
		trans.setOffice(office);
		
		return new ResponseEntity<String>("Success", HttpStatus.OK);
	}
	
	/*
	 * This end point enables us to get all the transactions in the database
	 */
	@SuppressWarnings("unused")
	@CrossOrigin
	@RequestMapping(value="/api/v1/transactions", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseEntity<Iterable<Transactions>> getTransactions(){
		Iterable<Transactions> results;
		
		// Get all transactions from the database.
		results = transDao.findAll();
		
		return new ResponseEntity<Iterable<Transactions>>(results, HttpStatus.OK);
	}
	
	@SuppressWarnings("unused")
	@CrossOrigin
	@RequestMapping(value="/api/v1/transactions/{clientId}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseEntity<Transactions> getTransPerClient(@PathVariable long clientId){
		Transactions results;
		
		// Get all transactions from the database for a particular client.
		results = transDao.findOne(clientId);
		
		return new ResponseEntity<Transactions>(results, HttpStatus.OK);
	}
	
	@Autowired
	TransactionDao transDao;
}
