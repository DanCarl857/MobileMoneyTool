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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionController {
	
	@SuppressWarnings("unused")
	@RequestMapping(value="/api/v1/create", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseEntity<String> saveTransaction(){
		try{
			Transactions trans = new Transactions();
			trans.setAmount(5000);
			trans.setClient_id(123456);
			trans.setDate(new Date());
			trans.setOffice("Head Office");
			trans.setRecipient("Marcus Brody");
			trans.setStaff("Daniel Carlson");
			trans.setType("Savings");
			
			transDao.save(trans);
		}catch(Exception ex){
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<String>(HttpStatus.OK);
		
	}
	
	@Autowired
	private TransactionDao transDao;
}
