package org.mifos.mmoney.api;

import org.mifos.mmoney.dao.ConfigurationsDao;
import org.mifos.mmoney.models.Configurations;
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

@RestController
public class ConfigurationsController {
	
	@CrossOrigin
	@RequestMapping(value="/api/v1/Configurations", method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseEntity<String> initialConfigurations(
			@RequestParam(value="region", required=true)String region,
			@RequestParam(value="country", required=false) String country,
			@RequestParam(value="parameters", required=true)String parameters,
			@RequestParam(value="domain", required=true)String domain){
		
		Configurations config = new Configurations();
		
		config.setRegion(region);
		config.setCountry(country);
		config.setParameters(parameters);
		config.setDomain(domain);
		
		// save configurations to the database
		try{
			configDao.save(config);
		} catch(Exception ex){
			System.out.println("Error saving configurations: " + ex.getMessage());
			return new ResponseEntity<String>("\"Failure in setting configurations\"", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<String>("\"Configurations successfully set\"", HttpStatus.OK);
	}
	
	@CrossOrigin
	@RequestMapping(value="/api/v1/update", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseEntity<String> updateConfigurations(){
		// TODO: write code to update the configurations in the database
		return null;
	}
	
	// Data repository.
	@Autowired
	private ConfigurationsDao configDao;
}
