package org.mifos.mmoney.api;

import org.mifos.mmoney.models.Withdrawals;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
	@RequestMapping(value="/api/v1/withdrawals", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseEntity<String> withdrawMoney(
			@RequestParam(value="phone", required=true)long phoneNumber,
			@RequestParam(value="amount", required=true) long amount){
		System.out.println("Phone number: " + phoneNumber);
		System.out.println("Amount: " + amount);
		
		/*
		 * uri: URL for withdrawing money in the mobile money API
		 * 
		 */
		final String uri = "http://gturnquist-quoters.cfapps.io/api/random";
		
		/*
		 * We now make a request to the Mobile money API
		 */
		RestTemplate restTemplate = new RestTemplate();
		Withdrawals result = restTemplate.getForObject(uri, Withdrawals.class);
		
		if(result.getType().equalsIgnoreCase("success")){
			// save to the database here.
			return new ResponseEntity<String>(result.getType(), HttpStatus.OK);
		}
		return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
	}
}
