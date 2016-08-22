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
	
	@SuppressWarnings("unused")
	@CrossOrigin
	@RequestMapping(value="/api/v1/configurations", method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseEntity<String> initialConfigurations(
			@RequestParam(value="region", required=false)String region,
			@RequestParam(value="country", required=false) String country,
			@RequestParam(value="apiName", required=true)String apiName,
			@RequestParam(value="org_phone", required=false)int phone,
			@RequestParam(value="orgAccId", required=true)int orgAccId,
			@RequestParam(value="urls", required=true)String urls,
			@RequestParam(value="params", required=true)String params){
		
		Configurations config = new Configurations();
		
		config.setRegion(region);
		config.setCountry(country);
		config.setApiName(apiName);
		config.setPhone(phone);
		config.setOrgAccId(orgAccId);
		config.setUrls(urls);
		config.setParameters(params);
		
		// save configurations to the database
		try{
			configDao.save(config);
		} catch(Exception ex){
			System.out.println("Error saving configurations: " + ex.getMessage());
			return new ResponseEntity<String>("\"Failure in setting configurations\"", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<String>("\"Configurations successfully set\"", HttpStatus.OK);
	}
	
	// Data repository.
	@Autowired
	private ConfigurationsDao configDao;
}
