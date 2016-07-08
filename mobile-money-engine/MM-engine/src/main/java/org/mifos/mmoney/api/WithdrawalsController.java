package org.mifos.mmoney.api;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class WithdrawalsController {
	
	/*
	 * TODO:
	 * - Make the uri an argument so it can be gotten from the front end application
	 * - response status has to be structured so it matches as many APIs as possible
	 */

	@SuppressWarnings("unused")
	@CrossOrigin
	@RequestMapping(value="/api/v1/withdrawals", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseEntity<String> withdrawMoney(
			@RequestParam(value="phone", required=true)long phoneNumber,
			@RequestParam(value="amount", required=true) long amount,
			@RequestParam(value="clientId", required=true)int clientID){
		
		/*
		 * uri: URL for withdrawing money in the mobile money API
		 * 
		 */
		/*int accountID = 12345678;
		final String uri = "http://api.furthermarket.com/FM/MTN/MoMo/requestpayment"
				+ "?MyaccountID={accountID}&CustomerPhonenumber={phoneNumber}&Amount={amount}";
		
		
		 * We now make a request to the Mobile money API
		 * TODO: make request to Mobile Money API
		 
		
		// Map to hold the parameters to be made with mobile money request
		Map<String, String> params = new HashMap<>();
				
		// set parameter values
		params.put("accountID", Long.toString(accountID)); // accountID here is the clients
		params.put("phoneNumber", Long.toString(phoneNumber)); // phone number here is the MFI's account
		params.put("amount", Long.toString(amount));
				
		RestTemplate restTemplate = new RestTemplate();
		// make request and get result
		String result = restTemplate.getForObject(uri, String.class);*/
		
		Transactions trans = new Transactions();
		
			
		trans.setAmount((int) amount);
		trans.setClient_id(clientID);
		trans.setDate(new Date());
		trans.setType("Withdrawal");
		trans.setOffice(trans.getOffice());
		trans.setStaff(trans.getStaff());
		trans.setRecipient("null");
			
		// Making sure values are saved in the database.
		try{
			transDao.save(trans);
		} catch(Exception ex){
			System.out.println("Saving to database error in withdrawals: " + ex.getMessage());
			return new ResponseEntity<String>("\"Withdrawals failure\"", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<String>("\"Withdrawals success\"", HttpStatus.OK);
	}

	// Data repository.
	@Autowired
	private TransactionDao transDao;
}
