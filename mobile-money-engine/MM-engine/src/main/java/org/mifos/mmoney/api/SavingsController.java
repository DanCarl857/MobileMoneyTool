package org.mifos.mmoney.api;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
			@RequestParam(value="clientId", required=true)int clientID,
			@RequestParam(value="accountId", required=true)int accountID){
		
		/*
		 * uri: URL saving money in the mobile money API
		 * TODO: make this generic. So this can be changed from front end application
		 */
		final String url = "http://api.furthermarket.com/FM/MTN/MoMo/Requestpayment?MyaccountID={accountNo}&CustomerPhonenumber=237{phone}&Amount={amount}&ItemDesignation=%22trans%22&ItemDescription=%22%22";
		
		Map<String, String> params = new HashMap<String, String>();
		
		params.put("accountNo", String.valueOf(accountID));
		params.put("phone", String.valueOf(phoneNumber));
		params.put("amount", String.valueOf(amount));
		
		try{
			RestTemplate restTemplate = new RestTemplate();
		    String resp = restTemplate.getForObject(url, String.class, params);
			System.out.println("Savings result: " + resp);
			
			/* 
			 * error handling: rudimentary but necessary
			 */
			if(resp.contains("error")){
				System.out.println("Error making request to Mobile money api.");
				return new ResponseEntity<String>("\"Savings failure\"", HttpStatus.EXPECTATION_FAILED);
			}
			
			/*
			 * Since transaction was successfully  carried out save it to the database
			 */
			Transactions trans = new Transactions();

			trans.setAmount((int) amount);
			trans.setClient_id(clientID);
			trans.setDate(new Date());
			trans.setType("Savings");
			trans.setOffice(trans.getOffice());
			trans.setStaff(trans.getStaff());
			trans.setRecipient("null");
				
			// Making sure values are saved in the database.
			try{
				transDao.save(trans);
			} catch(Exception ex){
				System.out.println("Saving to database error in savings: " + ex.getMessage());
				return new ResponseEntity<String>("\"Error saving to database in savings\"", HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return new ResponseEntity<String>("\"Savings success\"", HttpStatus.OK);
		} catch(Exception ex){
			System.out.println("Error making request to Mobile money api.\nErrorMessage: " + ex.getMessage());
			return new ResponseEntity<String>("\"Savings failure\"", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@Autowired
	private TransactionDao transDao;
}
