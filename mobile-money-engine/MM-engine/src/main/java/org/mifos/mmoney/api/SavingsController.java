package org.mifos.mmoney.api;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.mifos.mmoney.models.Savings;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class SavingsController {

	@SuppressWarnings("unused")
	@RequestMapping(value="/api/v1/savings", method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
	public 
	@ResponseBody
	ResponseEntity<String> saveMoney(
			@RequestParam(value="phone", required=true)long phoneNumber,
			@RequestParam(value="amount", required=true) long amount){
		System.out.println("Phone number: " + phoneNumber);
		System.out.println("Amount: " + amount);
		
		/*
		 * uri: URL saving money in the mobile money API
		 * TODO: make this generic. So this can be changed from front end application
		 */
		final String uri = "http://gturnquist-quoters.cfapps.io/api/random";
		
		/*
		 * We now make a request to the Mobile money API
		 */
		RestTemplate restTemplate = new RestTemplate();
		Savings result = restTemplate.getForObject(uri, Savings.class);
		
		if(result.getType().equalsIgnoreCase("success")){
			return new ResponseEntity<String>(result.getType(), HttpStatus.OK);
		}
		return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
	}
}
